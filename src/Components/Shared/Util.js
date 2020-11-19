import moment from 'moment'
import React from "react";
import * as Constants from './Constants'

export const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

export const trackEvent = (event, properties={}) => {
  window.analytics.track(event, properties)
}

export const isToday = (sessionJson) => {
  let startTime = new Date(sessionJson.start_time * 1000);
  const today = new Date()
  return startTime.getDate() == today.getDate() &&
    startTime.getMonth() == today.getMonth() &&
    startTime.getFullYear() == today.getFullYear()
}

export const isLive = (sessionJson) => {
  let startTime = sessionJson.start_time;
  let endTime = startTime + sessionJson.duration*60;
  let now = new Date().getTime() / 1000;
  return startTime < now && endTime > now;
}

export const isUpcoming = (sessionJson) => {
  let startTime = sessionJson.start_time;
  let now = new Date().getTime() / 1000;
  return startTime > now;
}

export const isTomorrow = (sessionJson) => {
  let startDate = moment.unix(sessionJson.start_time);
  let tomorrow = moment().add(1,'days');
  return tomorrow.isSame(startDate, 'day');
}

export const displayTimeTile = (sessionJson) => {
  let startTime = moment.unix(sessionJson.start_time);
  if(isToday(sessionJson)){
    return startTime.format("[Today ]h:mma")
  } else if(isTomorrow(sessionJson)){
    return startTime.format("[Tomorrow ]h:mma")
  } else {
    return startTime.format("ddd MMM D, h:mma")
  }
  
}

export const baseDomain = process.env.NODE_ENV && process.env.NODE_ENV != 'development' ? 'https://via.live' : 'http://localhost:3000'

export const baseLink = (path) => {
  return baseDomain + path
}

export const nextHour = () => {
  const start = moment();
  const remainder = 60 - start.minute();
  return moment().add(remainder, "minutes").toDate();
}

export const displayTimeProfile = (sessionJson) => {
  if(!sessionJson.start_time){
    return "";
  }
  let startTime = moment.unix(sessionJson.start_time);
  let endTime = moment.unix(sessionJson.start_time).add(sessionJson.duration,'minutes')
  if(isToday(sessionJson)){
    return startTime.format("h:mm") + " - " + endTime.format("h:mma")
  } else {
    return startTime.format("ddd MMM D, h:mma")
  }
  
}

export const displayPrice = (sessionJson) => {
  let dollars = sessionJson.class_cost/100;
  return  dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

export const displayPriceFromUserInput = (amount) => {
  if(amount == null) {
    return null;
  }
  return parseFloat(amount).toLocaleString("en-US", {style:"currency", currency:"USD"});

}

export const zoomMeetingNumber = (sessionJson) => {
  if(sessionJson.meeting_url.value){
    const url = new URL(sessionJson.meeting_url.value);
    const urlParts = url.pathname.split("/");
    return parseInt(urlParts[urlParts.length - 1]);
  } else {
    return sessionJson.zoom_meeting_id.value
  }
}

export const zoomMeetingPassword = (sessionJson) => {
  if(sessionJson.meeting_url.value){
    const url = new URL(sessionJson.meeting_url.value);
    const pwdQueryParam = url.searchParams.get("pwd");
    return pwdQueryParam ? pwdQueryParam : "";
  } else {
    return sessionJson.zoom_password.value
  }
}

export const creditCardBrandIcon = (brand) => {
  let icon = null;
  switch(brand.toLowerCase())
  {
    case "mastercard":
     icon = "/PaymentModal/MasterCard-light.png";
     break;
    case "visa": 
      icon = "/PaymentModal/Visa-light.png";
      break;
    case "american express": 
      icon = "/PaymentModal/AmericanExpress-light.png";
      break;
    case "discover": 
      icon = "/PaymentModal/Discover-light.png";
      break;
    case "jcb": 
      icon = "/PaymentModal/JCB-light.png";
      break;
    case "diners club": 
      icon = "/PaymentModal/DinersClub-light.png";
      break;
  }
  if(icon){
    return <img src={icon}/>
  } else {
    return null;
  }
  
}

export const sessionIsDonation = (sessionJson) => {
   return !(sessionJson.paywall_type && sessionJson.paywall_type == 1);
}

export const convertTagsToTagOptions = (tags) => {
  if(!tags){
    return []
  } else {
    return tags.split(",").map((tag) => {
      return {id:tag, name:tag}
    })

  }
}


export const nameAndEmailFromInstructorInvite = (instructorInviteJson) => {
  let instructorJson = instructorInviteJson.instructor
  let firstName = "";
  let lastName = "";
  let email = "";
  if(instructorInviteJson.email){
    email = instructorInviteJson.email
  } else if(instructorJson.email){
    email = instructorJson.email
  } else if(instructorJson.user){
    email = instructorJson.user.email
  }
  let nameAndEmail = email;
  if(instructorJson.name){
    let splitName = instructorJson.name.split(' ');
    firstName = splitName[0];
    if(splitName.length > 0){
      lastName = splitName[1]
    }
  } else if(instructorJson.user){
    firstName = instructorJson.user.first_name
    lastName = instructorJson.user.last_name
  }
  let name = "";
  if(firstName){
    name = firstName
    if(lastName){
      name += " " + lastName
    }
  }
  if(name.length > 0){
    nameAndEmail = name + ", " + email;
  }
  return {
    firstName: firstName,
    lastName: lastName,
    email:email,
    nameAndEmail:nameAndEmail
  }
}

export const userNameToDisplay = (userJson) => {
  if(userJson.name){
    return userJson.name;
  }
  if(userJson.first_name){
    if(userJson.last_name){
      return userJson.first_name + " " + userJson.last_name
    } else {
      return userJson.first_name
    }
  }
  return ""
  
}

export const nameAndProfileImgFromSessionJson = (sessionJson) => {
  return nameAndProfileFromUser(sessionJson.user)
}

export const nameAndProfileFromUser = (userJson) => {
  
  let name = "";
  let profileImg = "/Account/default_profile.jpg";
  
  if(userJson.name){
    name = userJson.name
  } else if(userJson.first_name){
    name = userJson.first_name + " " + (userJson.last_name || "")
  }
  if(userJson.profile_img_url){
    profileImg = userJson.profile_img_url
  }
  return {name:name, profileImg:profileImg} 
}

export const getFullResolutionBanner = (bannerImage) => {
  return bannerImage == "/Shared/via_banner_default.png" ? "/Shared/via_banner_default.png" : bannerImage + "=s0"
}

export const isZoomUrlInvalid = (sessionJson) => {
 return !sessionJson.meeting_url.value || !sessionJson.meeting_url.value.includes("zoom.us/j/") || !sessionJson.meeting_url.value.includes("pwd=")
}

export const textFieldErrorClass = (errors, field) => {
  if(errors[field]){
    return "error-input"
  } else {
    return "";
  }
}

export const labelErrorClass = (errors, field) => {
  if(errors[field]){
    return "error-label"
  } else {
    return "";
  }
  
}

