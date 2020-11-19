import React from "react";
import './ZoomPlayer.scss';
import '../Shared/PaymentModal.scss'
import joinChildren from '../Shared/react-join-children.js'
import Stars from "../Shared/Stars"
import SessionTileCarousel from '../Shared/SessionTileCarousel';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import useFetch from '../Shared/UseFetch';
import * as Constants from '../Shared/Constants'
import $ from "jquery";
import axios from 'axios';
import {isToday, trackEvent, isLive, displayTimeProfile, zoomMeetingNumber, displayPrice,zoomMeetingPassword, sessionIsDonation, isUpcoming,nameAndProfileImgFromSessionJson,sample} from '../Shared/Util'
import {firstNames, lastNames} from "../Shared/Names"
import { useAuth0 } from "../react-auth0-spa";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import PaymentModal from "../Shared/PaymentModal";
import EmailSignupModal from "../Shared/EmailSignupModal";
import { Link } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import cx from 'classnames';

const PageState = {
    CLASS_NOT_LIVE: 'The class is not currently live based on time',
    CLASS_LIVE_LOADING_ZOOM: 'The class is live time wise and loading the zoom stream',
    CLASS_LIVE_MEETING_STARTED: 'The class is live and the host has started the zoom stream and we have connected successfully',
    CLASS_LIVE_AWAITING_MEETING_START: 'The class is live but the host has not started the zoom meeting stream',
    CLASS_LIVE_CONNECT_ERROR: "The class is live but there was an error connecting to theh zoom stream"
}


function ZoomPlayer(props){
  let {sessionId} = useParams();
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout, getTokenSilently  } = useAuth0();
  const [joined, setJoined] = useState(false);
  const [sessionJson, setSessionJson] = useState({tags:"",user:{}});
  const retryTimeout = useRef(false)
  const audioRetryTimeout = useRef(false)

  const [audioRetries, setAudioRetries] = useState(30)
  const [browserPlayAllowed, setBrowserPlayAllowed] = useState(true)
  
  const [muted, setMuted] = useState(true)
  const [playZoom, setPlayZoom] = useState(false)
  const [loading,setLoading] = useState(false)
  const [playZoomClicked, setPlayZoomClicked] = useState(false)



  const [username, setUsername] = useState(sample(firstNames) + " " + sample(lastNames))
  let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const shouldAutoPlay = !(new URLSearchParams(window.location.search).get('stopped')) && !isIOS;


  useEffect(() => {
    document.body.classList.add("no-scroll");
    const messageHandler = event => {
      try{
        const message = event.data
        if(message.eventType === "viaJoinClass"){
          joinClass()
        }
      }catch{

      }
    }
    window.addEventListener("message", messageHandler)


    // clean up
    return () => window.removeEventListener("message", messageHandler)
  },[])

  const notifyParentStateUpdate = (pageState) => {
    window.top.postMessage(
    {pageState:pageState,eventType:"viaStateUpdate"},
    '*')
  }

  const notifyParentErrorText = (errorText) => {
    window.top.postMessage(
    {errorText:errorText,eventType:"viaErrorText"},
    '*') 
  }

  const handleLeaveMeetingClick = () => {
    notifyParentStateUpdate(PageState.CLASS_NOT_LIVE)
  }

  const joinZoomSession = (meetingNumber, meetingPassword, signature) => {
    console.log("join zoom session called");
    console.log("meetingNumber",meetingNumber);
    trackEvent("attempting to join zoom session");

    ZoomMtg.join(
      {
        meetingNumber: meetingNumber,
        userName: username,
        signature: signature,            
        apiKey: Constants.ZOOM_API_KEY,
        passWord:meetingPassword,
        // userEmail:"guest@gmail.com",
        success() {
          console.log("Zoom stream started successfully")
          trackEvent("Joined zoom success")
          setInterval(() => {
            trackEvent("Zoom playing", {sessionId:sessionJson.id})
          },60000)
          clearInterval(retryTimeout.current);
          notifyParentStateUpdate(PageState.CLASS_LIVE_MEETING_STARTED)          
          console.log(playZoomClicked)
          if(playZoomClicked){
            setMuted(true)
            audioRetryTimeout.current = setInterval(() => {
              if($(".zm-btn--primary").length > 0){
                $(".zm-btn--primary").click();

                setTimeout(() => {
                  $(".join-audio[aria-label='mute my microphone']").click();
                },1000)

              } else {
                setAudioRetries(audioRetries - 1)
                if(audioRetries > 0){
                  clearInterval(audioRetryTimeout.current)
                }
              }
            },1000);
          }
          if(sessionJson.purchased){
            joinClass();
          }
          setTimeout(() => {
            if($(".bhold-msg").length > 0 && $(".bhold-msg").html().includes("let you in soon")){
              trackEvent("entered waiting room")
            }
          },1000)
          // let attendees = ZoomMtg.getAttendeeslist({});
          // setNumAttendees(attendees.length);
        },
        error(res) {
          console.log("join error");
          console.log(res);
          if(res.errorCode == 3008) {
            notifyParentStateUpdate(PageState.CLASS_LIVE_AWAITING_MEETING_START)
            trackEvent("Zoom awaiting host start")
          } else {
            notifyParentStateUpdate(PageState.CLASS_LIVE_CONNECT_ERROR)
            trackEvent("Zoom join error")
            setTimeout(() => {
              console.log($(".zm-modal-body-content").text());
              notifyParentErrorText($(".zm-modal-body-content").text())
            }, 500);
          }
          
          if(true){
            if(process.env.NODE_ENV && process.env.NODE_ENV != 'development'){
              if(!retryTimeout.current){
                retryTimeout.current = setInterval(() => {
                  console.log("timeout triggered");
                  joinZoomSession(meetingNumber, meetingPassword, signature)
                },3000);
              }
            }
          }
        }
      }
    );  
  }

  const initZoom = (meetingNumber, meetingPassword, signature) => {
    console.log("Init zoom starting");
    trackEvent("attempting to init zoom");
    var leaveUrl = new URL(window.location.href);
    leaveUrl.searchParams.set('stopped',1)
    ZoomMtg.init({
      leaveUrl: leaveUrl.href,
      success() {
        joinZoomSession(meetingNumber, meetingPassword, signature)
      },
      error(res) {
        console.log(res);
        trackEvent("Zoom init errored")
      }
    });
  }

  const loadZoom = (meetingNumber, meetingPassword) => {
    trackEvent("attempting to load zoom");
    console.log("joining zoom meeting");
    const generateSignaturePostData = {
      meetingNumber:meetingNumber,
      role:0
    }

    const result = axios.post(Constants.BASE_ZS_URL, generateSignaturePostData)
    .then(function (response) {
      const signature = response.data.signature;
      console.log(response);
      initZoom(meetingNumber, meetingPassword, signature);
    })
    .catch(function (error) {
      console.log(error);
      trackEvent("load zoom error",{error:error});
    });
  }

  const mute = () => {
    trackEvent("mute clicked")
    $("#audioMenu").click()
    setTimeout(() => {
      $("a[role='menuitem'][tabindex='-1']").each((index,el) => {
        console.log($(el).html())
        console.log($(el).html() === "Leave Computer Audio")
        if($(el).html() === "Leave Computer Audio"){
          console.log("about to click")
          console.log(el)
          el.click();
        }
      })
      setTimeout(() => {
        $("a[role='menuitem'][tabindex='-1']").each((index,el) => {
          if($(el).html() === "Leave Computer Audio"){
            console.log("about to click")
            console.log(el)
            el.click();
          }
        })
        setTimeout(() => {
          $("a[role='menuitem'][tabindex='-1']").each((index,el) => {
            if($(el).html() === "Leave Computer Audio"){
              console.log("about to click")
              console.log(el)
              el.click();
            }
          })
        },500)
      },500)
    },300)
    setMuted(true)
  }

  const unmute = () => {
    trackEvent("unmute clicked")
    if($(".zm-btn--primary").length > 0){
      $(".zm-btn--primary").click();

      setTimeout(() => {
        $(".join-audio[aria-label='mute my microphone']").click();
      },1000)
    }
    setMuted(false)
  }

  useEffect(() => {
    console.log("Inside use effect for class")
    const fetchData = async () => {
      let url = "";
      let headers = {};
      url = Constants.BASE_URL + '/get_session_by_id_noauth'; 
      console.log("url is")
      console.log(url);
      
      const result = await axios.post(url, {"id":sessionId},{
        headers: headers
      })
      .then(function (response) {
        console.log("class response");
        console.log(response);
        let sessionJson = response.data;
        setSessionJson(sessionJson);
        let context;
        try{
          context = new AudioContext();
        } catch {

        }
        let browserAutoplay = null;
        if(isLive(sessionJson)){
          if(!context || context.state === "running"){
            console.log("browser autoplay allowed")
            console.log(shouldAutoPlay)
            setBrowserPlayAllowed(true)
            browserAutoplay = true
            if(shouldAutoPlay){
              let meetingNumber = zoomMeetingNumber(sessionJson)
              let zoomPassword = zoomMeetingPassword(sessionJson)
              playZoomSession(meetingNumber,zoomPassword)
            }
          } else {
            browserAutoplay = false
            console.log("browser autoplay not allowed")
            trackEvent("Autoplay blocked by browser")
            setBrowserPlayAllowed(false)
          }
        }
        trackEvent("received data zoom player",{
          isLive:isLive(sessionJson),
          isSessionPage:window.top.location.pathname.startsWith("/session/"),
          hasStoppedParameter:(new URLSearchParams(window.location.search).get('stopped')) !== null,
          isIOS:isIOS,
          browserAutoplay:browserAutoplay
        })
      })
      .catch(function (error) {
        console.log(error);
        trackEvent("zoom player load session failed",{error:error})
      });;
    };
    fetchData();


    console.log('checkSystemRequirements');
    try{
      console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    } catch(err) {
      console.log("Error from checking system requirements");
      console.log(err);
      trackEvent("check requirements fail",{error:err})
    }

    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.8/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    
    return function cleanupListener() {
      clearInterval(retryTimeout.current);
      clearInterval(audioRetryTimeout.current)
      ZoomMtg.leaveMeeting({});
    }

  }, []);

  const playZoomSessionClick = () => {
    setPlayZoomClicked(true)
    trackEvent("play session clicked")
    let meetingNumber = zoomMeetingNumber(sessionJson)
    let zoomPassword = zoomMeetingPassword(sessionJson)
    playZoomSession(meetingNumber, zoomPassword)
  }

  const playZoomSession = (meetingNumber, zoomPassword) => {
    trackEvent("attempting to play zoom session");
    console.log(meetingNumber)
    console.log(zoomPassword)
    if(isIOS){
      let meetingUrl = "https://us04web.zoom.us/j/" + meetingNumber + "?pwd=" + zoomPassword
      window.open( meetingUrl, "_blank");
      return;
    }
    notifyParentStateUpdate(PageState.CLASS_LIVE_LOADING_ZOOM)
    loadZoom(meetingNumber,zoomPassword);
    setPlayZoom(true)
  }

  const stopZoomSession = () => {
    
    setLoading(true)
    ZoomMtg.leaveMeeting({});
  }


  const joinClass = () => {
    setJoined(true);
    setTimeout(() => {
      if($("#zoom-player .footer__leave-btn").length > 0){
        console.log("attaching leave meeting listener")
        $("#zoom-player .footer__leave-btn")[0].addEventListener('click', handleLeaveMeetingClick)
      }
      
    },1000);
  }

  if(loading){
    return <div>Leaving session...</div>
  }

  return (
    <div id='zoom-player'>
      <div className={cx({"previewing":!joined, "d-none":!playZoom})}>
        <div className="live-indicator">
          <img src="/Session/Live.png"/>
        </div>
        {!muted && <img className='mute-icon' src="/ZoomPlayer/unmute.png" onClick={mute}/>}
        {muted && <img className='mute-icon' src="/ZoomPlayer/mute.png" onClick={unmute}/>}
        <img className='stop-button' src="/ZoomPlayer/stop.png" onClick={stopZoomSession}/>
        <div id='zmmtg-root'></div>
      </div>
      <div style={{backgroundImage: 'url(' + sessionJson.profile_img_url + ')'}} className={cx("bg-cover justify-content-center align-items-center join-session-container",{"d-none":playZoom, "d-flex":!playZoom})}>
        <img className='play-button' src="/ZoomPlayer/play.png" onClick={playZoomSessionClick}/>
          
      </div>
      <script src="https://source.zoom.us/zoom-meeting-1.7.8.min.js"></script>
    </div>
    );
}

export default ZoomPlayer;


