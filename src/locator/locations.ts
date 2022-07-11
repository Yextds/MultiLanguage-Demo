import {
  formatMiOrKm,
  formatNumber,
  formatPhone,
  getValueFromPath,
} from "./utils";
import {
  parseTimeZoneUtcOffset,
  formatOpenNowString,
  formatTimeString
} from "./time";
import { i18n } from "../i18n";
import {
  base_url,
  limit,
  locationInput,
  locationNoun,
  locationNounPlural,
  locationOption,
  locationOptions,
  radius,
  savedFilterId,
  entityTypes,
  liveAPIKey,
} from "./constants";
import { getRequest, startLoading, stopLoading } from "./loader";
import RtfConverter from "@yext/rtf-converter";
import { highlightLocation} from "./map";
// import $ from "jquery";
// import { twbsPagination } from "twbs-pagination";
export let currentLatitude = 0;
export let currentLongitude = 0;

export function locationJSONtoHTML(entityProfile, index, locationOptions) {
  const getValue = (opt: locationOption) => {
    let val = opt.value;

    if (opt.contentSource === "FIELD") {
      val = getValueFromPath(entityProfile, opt.value);

    }
    return opt.isRtf && !!val ? RtfConverter.toHTML(val) : val;
  };

  const cardTitleValue = getValue(locationOptions.cardTitle);
  const getDirectionsLabelValue = getValue(locationOptions.getDirectionsLabel);
  const viewDetailsLinkTextValue = getValue(
    locationOptions.viewDetailsLinkText
  );
  let cardTitleLinkUrlValue = getValue(locationOptions.cardTitleLinkUrl);
  const hoursValue = getValue(locationOptions.hours);
  const addressValue = getValue(locationOptions.address);
  const phone = getValue(locationOptions.phoneNumber);
  const phoneno = getValue(locationOptions.catringnumber);
  const brandsname = getValue(locationOptions.status);
  const phoneNumberValue = phone.toString();
  let viewDetailsLinkUrlValue = getValue(locationOptions.viewDetailsLinkUrl);

  let html =
    '<div class="lp-param-results lp-subparam-cardTitle lp-subparam-cardTitleLinkUrl">';
  if (cardTitleLinkUrlValue && cardTitleValue) {

    if (cardTitleLinkUrlValue["url"]) {
      cardTitleLinkUrlValue = cardTitleLinkUrlValue["url"];

    }
    // html += `<div class="name hover:underline hover:font-semibold text-ll-red ">
    //   <a href="${cardTitleLinkUrlValue}">
    //     ${cardTitleValue} 
    //   </a>
    // </div>`;
  }
  else if (cardTitleValue) {
    html += `<button id ="result1" class="name hover:underline hover:font-semibold text-ll-red " >
      ${cardTitleValue}
    </button>`;
  }
  html += "</div>";
  // let count_index = index+1;  
  //   html += '<div class="lp-param-results lp-subparam-getDirectionsLabel ml-6"> '+ count_index + '</div>';
  //html += '<a  href='+ '<h4 class="storelocation-name text-xl font-Futura uppercase font-black text-textblack mb-1 pr-5 pl-10 md:pl-6 lg:pl-16">' + cardTitleValue + '</h4>'+  '</a>';
  
   html += '<a id="resul-'+ index +'" class="storelocation-name details text-textblack mb-1 pr-5 pl-10 text-sm md:pl-6 lg:pl-16"' + '<h4 class="text-sm font-Futura uppercase mb-1 pr-5 pl-2 md:pl-2 lg:pl-4"> ' + cardTitleValue + ' </h4>' + '</a>';
  $(document).ready(function () {
    // $("#slideWindow").click(function () {
    //   $(".panel").slideDown("slow");
    // });
  });


  html += '<div class="address text-xs font-normal text-gray-700 leading-tight w-1/2 uppercase mb-2 pr-5 pl-2 md:pl-2 lg:pl-4">';

  html += addressValue.line1 + ', ' + addressValue.city + ', ' + addressValue.postalCode + ', ' + addressValue.countryCode + '<br>' + "</div>";


  // if (phoneNumberValue) {
  //   const formattedPhoneNumber = formatPhone(
  //     phoneNumberValue,
  //     addressValue.countryCode
  //   );
  //   if (formattedPhoneNumber) {
  //    // html += '<div class="phone">' +'<img src="images/icons8-phone-50.png" class= "h-6 ">' + "</div>";
  //     html += '<p>'+'<img src="images/icons8-phone-50.png" class= "h-6 ">'  + formattedPhoneNumber + "</p>";
  //   }
  // }

  html += '<div class="phone text-xs mb-2 mt-2 pl-4">' + '&#9742;' + phone + "</div>";
  if (phoneno) {
    html += '<div class="phone text-base mb-2 mt-2">' + '&#9742;' + phoneno + "</div>";
  }

  // if (hoursValue) {
  //   const offset = getValueFromPath(entityProfile, "timeZoneUtcOffset");
  //   const parsedOffset = parseTimeZoneUtcOffset(offset);
  //   html += '<div class="lp-param-results lp-subparam-hours">';
  //   html +=
  //   '<div class="open-now-string  text-sm text-black pl-4">' +
  //     formatOpenNowString(hoursValue, parsedOffset)
  //   "</div>";

  //   html += '<div class="storelocation-openCloseTime hidden pr-5 pl-2 md:pl-6 lg:pl-0  text-black leading-tight capitalize">';   
  //       html +='<ul>';
  //   // --------24 to 12 time change---------
  //     $.each(hoursValue, function (indexh, hour) {
  //       function Convert(time) {
  //         // Check correct time format and split into components
  //         time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  //         if (time.length > 1) { // If time format correct
  //           time = time.slice (1);  // Remove full string match value
  //           time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
  //           time[0] = +time[0] % 12 || 12; // Adjust hours
  //         }
  //         return time.join (''); // return adjusted time or original string
  //       }

  //     html += '<div class="flex"><li><div class="float-left w-28 text-sm"><strong>';
  //     html +=  indexh.toString();
  //     html += '</strong></div>';

  //       if(hour.openIntervals){
  //         $.each(hour.openIntervals, function (op, openInterval) {
  //           html += '<div class="float-right text-sm">' + openInterval.start+' to '+Convert(openInterval.end) + '</div>';
  //         });
  //       }else{
  //         html += '<span class = "text-sm">Closed </span>';
  //       }

  //     html += '</li></div>'; 
  //   });
  //   html += '</ul>';                        
  //   html += '</div>';
  //   html += "</div>";
  // }

  
  function convertDays(days) {
    const currentDate = new Date();
    const dayNumber = currentDate.getDay();
    const currentSelectedDay = days[dayNumber];
    const beforeSelected = days.slice(0,dayNumber);
    const afterSelected = days.slice(dayNumber,days.length);
    beforeSelected.forEach((element)=>{
      afterSelected.push(element);
    });
    return {
      afterSelected:afterSelected
    };
  }

  if (hoursValue) {
    const offset = getValueFromPath(entityProfile, "timeZoneUtcOffset");
    const parsedOffset = parseTimeZoneUtcOffset(offset);
    html += '<div class="lp-param-results lp-subparam-hours">';
    html +=
      '<div class="open-now-string pl-4 text-sm" data-id="main-shop-' + index + '">' +
      formatOpenNowString(hoursValue, parsedOffset) +
      "</div>";

    html += '<div class="storelocation-openCloseTime pr-5 lg:pl-2 pb-4 text-[black] text-[12px] leading-tight capitalize" style="display:none;" >';
    html += '<ul id="time-row-main-shop-' + index + '">';

    let dayConvert = { "monday": "lundi", 
                "tuesday":"mardi",
                "wednesday":"mercredi",
                "thursday":"jeudi",
                "friday":"vendredi",
                "saturday":"samedi",
                "sunday":"dimanche"
              };

const days_string = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
  ];
    
    const convertedDays = convertDays(days_string);
   
    let sort_array = [];
    $.each(convertedDays.afterSelected, function (indexh, convertedDay) {
      let daya = [ 
        convertedDay,hoursValue[convertedDay]
      ];

      sort_array.push(daya);

    });

    console.log(sort_array);

    $.each(sort_array, function (indexh, hour) {
      // console.log(indexh);
      html+='<li class="time-row">' 
      html += '<div><strong class="daydiv days_values capitalize" >';
      html += dayConvert[hour[0].toString()]+' ';
      html += '</strong>';
        if(hour[1].openIntervals){
          $.each(hour[1].openIntervals, function (op, openInterval) {
            html += '<span class="pl-5 text-xs sm:text-sm" >'+openInterval.start+' à '+openInterval.end+'</span>';
          });
        }else{
          html += '<span class="pl-5" >Closed</span>';
        }       
      html += '</div>';
      html+='</li>' 
      
    });
    html += '</ul>';                        
    // html += '</div>';
                      
       html += "</div>";
     }
  const singleLineAddress =
    entityProfile.name +
    " " +
    addressValue.line1 +
    " " +
    (addressValue.line2 ? addressValue.line2 + " " : "") +
    addressValue.city +
    " " +
    addressValue.region +
    " " +
    addressValue.postalCode;
  // html +='<div class="text-base mb-2 mt-2">' +'status:' + brandsname + "</div>";
  html += `<div class="flex flex-row flex-wrap float-left lp-param-results lp-subparam-getDirectionsLabel">
  <button class="link text-xs pl-4 pt-2 text-red-600">
      <a target="_blank"
        href="https://www.google.com/maps/dir/?api=1&destination=${singleLineAddress}">
        ${getDirectionsLabelValue}
      </a>
    </button>
  </div>`;

  html += '<div class="lp-param-results lp-subparam-availability mt-3">';

  html += "</div>";

  html += '<div class="mb-2 mt-2"><a class="subrton view-btn" href=' + cardTitleLinkUrlValue + '>Branch details' + '</a></div>';

  // Add center column
  html = `<div class="center-column">${html}</div>`;

  // Add left and right column
  /*if (entityProfile.__distance) {
    html = `<div class="left-column">
      ${index + 1}.
    </div>
    ${html}
    <div class="right-column"><div class="distance">
      ${formatMiOrKm(l;
        entityProfile.__distance.distanceMiles,
        entityProfile.__distance.distanceKilometers
      )}
    </div></div>`;
  }else{*/
  //   html = `<div class="left-column absolute ml-6 top-9 ">
  //   <img src="images/icon1.svg" class="h-6">
  // </div>${html}`;

  /*}*/

  return `<div id="result-${index}" class="result border-b border-black border-opacity-40 list-group-item w-full  relative ">${html}</div>`;
}







// Renders each location the the result-list-inner html
export function renderLocations(locations, append, viewMore) {
  if (!append) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML = "";
      });
  }

  // Done separately because the el.innerHTML call overwrites the original html.
  // Need to wait until all innerHTML is set before attaching listeners.
  locations.forEach((location, index) => {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML += locationJSONtoHTML(location, index, locationOptions);
      });
  });

  locations.forEach((_, index) => {
    document
      .getElementById("result-" + index)
      .addEventListener("mouseover", () => {
        highlightLocation(index, false, false);
      });
    document.getElementById("result-" + index).addEventListener("click", () => {
      highlightLocation(index, false, true);
    });
  });

  if (viewMore) {
    [].slice
      .call(document.querySelectorAll(".result-list-inner") || [])
      .forEach(function (el) {
        el.innerHTML +=
          '<div><div class="btn btn-link btn-block">View More</div></div>';
      });
  }
}

function searchDetailMessageForCityAndRegion(total) {
  if (total === 0) {
    return '0 [locationType] found near <strong>"[city], [region]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[city], [region]"</strong>';
  }
}

function searchDetailMessageForArea(total) {
  if (total == 0) {
    return '0 [locationType] found near <strong>"[location]"</strong>';
  } else {
    return '[formattedVisible] of [formattedTotal] [locationType] near <strong>"[location]"</strong>';
  }
}

function searchDetailMessageNoGeo(total) {
  if (total === 0) {
    return "0 [locationType]";
  } else {
    return "[formattedVisible] of [formattedTotal] [locationType]";
  }
}

// Renders details of the search
export function renderSearchDetail(geo, visible, total, queryString) {
  // x of y locations near "New York, NY"
  // x  locations near "New York, NY"
  // x  locations near "New York, NY"

  let locationType = locationNoun;
  if (total === 0 || total > 1) {
    locationType = locationNounPlural;
  }

  let formattedVisible = formatNumber(visible);
  let formattedTotal = formatNumber(total);

  let searchDetailMessage;
  if (geo) {
    if (geo.address.city !== "") {
      searchDetailMessage = searchDetailMessageForCityAndRegion(total);
      searchDetailMessage = searchDetailMessage.replace(
        "[city]",
        geo.address.city
      );
      searchDetailMessage = searchDetailMessage.replace(
        "[region]",
        geo.address.region
      );

    } else {
      let location = "";
      if (geo.address.region) {
        location = geo.address.region;
      } else if (geo.address.country && queryString) {
        location = queryString;
      } else if (geo.address.country) {
        location = geo.address.country;
      }
      if (location !== "") {
        searchDetailMessage = searchDetailMessageForArea(total);
        searchDetailMessage = searchDetailMessage.replace(
          "[location]",
          location
        );
      }
    }
  } else {
    searchDetailMessage = searchDetailMessageNoGeo(total);
  }
  searchDetailMessage = searchDetailMessage.replace(
    "[locationType]",
    locationType
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedVisible]",
    formattedVisible
  );
  searchDetailMessage = searchDetailMessage.replace(
    "[formattedTotal]",
    formattedTotal
  );

  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = "";
    });
  [].slice
    .call(document.querySelectorAll(".search-center") || [])
    .forEach(function (el) {
      el.innerHTML = searchDetailMessage;
    });
}

// export function getNearestLocationsByString() {
//   const queryString = locationInput.value;
//   if (queryString.trim() !== "") {

//     var request_url = base_url + "entities/geosearch";

//     request_url += "?radius=" + radius;
//     request_url += "&location=" + queryString;

//     // Uncommon below to limit the number of results to display from the API request
//     // request_url += "&limit=" + limit;
//     getRequest(request_url, queryString);
//   }
//   var url = window.location.href;
//   var myStorage = window.sessionStorage;
//   sessionStorage.setItem('query', url);
// }

// find near location:-
export function getNearestLocationsByString() {
  const queryString = locationInput.value;
  if (queryString.trim() !== "") {

    // var request_url = base_url + "entities/geosearch";

    // request_url += "?radius=" + radius;
    // request_url += "&location=" + queryString
    let request_url =
      base_url +
      "entities" +
      "?limit=" +
      limit +
      "&offset=" +
      offset +
      '&sortBy=[{"name":"ASCENDING"}]';

    let filterParameters = {};
    let filterAnd = {};
    let filterOr = {};

    if (queryString) {

      filterOr = {
        "$or": [
          { "address.line1": { "$contains": queryString } },
          { "address.city": { "$contains": queryString } },
          { "address.region": { "$contains": queryString } },
          { "address.countryCode": { "$contains": queryString } },
          { "address.postalCode": { "$contains": queryString } },
          { "name": { "$contains": queryString } },
          { "mainPhone": { "$contains": queryString } }
        ]
      };

    }

    var ce_departments = [];
    $('.checkbox_departments').each(function () {
      if ($(this).is(":checked")) {
        ce_departments.push($(this).val());
      }
    });

    if (ce_departments.length > 0) {
      filterAnd = { "$and": [{ "c_departments": { "$in": ce_departments } }] };
    }

    filterParameters = { ...filterOr, ...filterAnd };
    var filterpar = JSON.stringify(filterParameters);
    var filter = encodeURI(filterpar);

    if (filter) {
      request_url += "&filter=" + filter;
    }





    // true value is for pagination remove when we search any single location or (location < 10)------
    getRequest(request_url, queryString);
  }
  var url = window.location.href;
  var myStorage = window.sessionStorage;
  sessionStorage.setItem('query', url);

}


// Get locations by lat lng (automatically fired if the user grants acceess)
function getNearestLatLng(position) {
  [].slice
    .call(document.querySelectorAll(".error-text") || [])
    .forEach(function (el) {
      el.textContent = "";
    });
  currentLatitude = position.coords.latitude;
  currentLongitude = position.coords.longitude;
  let request_url = base_url + "entities?entities/geosearch";
  request_url += "?radius=" + radius;
  request_url +=
    "&location=" + position.coords.latitude + ", " + position.coords.longitude;
  request_url += "&limit=" + limit;
  getRequest(request_url, null);
}

// Gets a list of locations. Only renders if it's a complete list. This avoids a dumb looking map for accounts with a ton of locations.
export let offset = 0;
export function getLocations(offset) {
  let request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&offset=" +
    offset +
    '&sortBy=[{"name":"ASCENDING"}]';

  let filterParameters = {};
  let filterAnd = {};
  let filterOr = {};

  const queryString = locationInput.value;

  if (queryString) {

    filterOr = {
      "$or": [
        { "address.line1": { "$eq": queryString } },
        { "address.city": { "$eq": queryString } },
        { "address.region": { "$eq": queryString } },
        { "address.countryCode": { "$eq": queryString } },
        { "address.postalCode": { "$eq": queryString } },
        { "name": { "$eq": queryString } }
      ]
    };
  }

  var ce_departments = [];
  $('.checkbox_departments').each(function () {
    if ($(this).is(":checked")) {
      ce_departments.push($(this).val());
    }
  });

  if (ce_departments.length > 0) {
    filterAnd = { "$and": [{ "c_company_services": { "$in": ce_departments } }] };

  }

  filterParameters = { ...filterOr, ...filterAnd };
  var filterpar = JSON.stringify(filterParameters);
  var filter = encodeURI(filterpar);

  if (filter) {
    request_url += "&filter=" + filter;
  }

  getRequest(request_url, null);

}
getLocations(0);
// filter CHECKBOX data:

document.getElementById("viewMoreBtn").addEventListener("click", function () {
  let newOffset = offset + limit;
  offset = newOffset;
  getLocations(offset);
});

// export function getDepartments() {
//   var baseURL = "https://liveapi.yext.com/v2/accounts/me/entities?";
//   var api_key = "308d4d3f6ae747ccda5a5c0bbb8249a6";
//   var vparam = "20161012";
//   var entityTypes = "location";
//   var savedFilterId = "1160385474";

//   var fullURL =
//     baseURL +
//     "api_key=" +
//     api_key +
//     "&v=" +
//     vparam +
//     "&resolvePlaceholders=true" +
//     "&entityTypes=" +
//     entityTypes +
//     "&savedFilterIds=" +
//     savedFilterId +
//     "&limit=50";

//   fetch(fullURL).then(response => response.json()).then(result => {

//     if (!result.errors) {
//       if (result.response.count > 0) {
//         var html = '';
//         html += '<div class=" department-list flex justify-center">';
//         html += '  <div class="mb-3 xl:w-96">';
//         html += `   <select id="mySelect" class=" checkbox_departments form-select appearance-none
//                          block
//                         w-full
//                         px-3
//                         py-1.5
//                         text-base
//                         font-normal
//                         text-gray-700
//                         bg-white bg-clip-padding bg-no-repeat
//                         border border-solid border-gray-300
//                         rounded
//                         transition
//                         ease-in-out
//                         m-0
//                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">`
//         // html+= '<option selected>Open this select menu</option>';     

//         html += '<option>' + "COUNTRY" + '</option>';
//         $.each(result.response.entities, function (index, entity) {
//           console.log(index);

//           // html+=  '<option value="'+entity.address.city+'">'+entity.address.city+'</option>';
//           html += '<option value="' + entity.address.countryCode + '">' + entity.address.countryCode + '</option>';



//         });
//         html += '</select>';
//         html += '</div>';
//         html += '</div>';
//         $(".filtering").html(html);

//         $(".checkbox_departments").change(function () {
//           var x = document.getElementById("mySelect").selectedIndex;
//           let selectcity = document.getElementsByTagName("option")[x].value;
//           // alert($('checkbox_departments:selected').text());
//           getcity(selectcity);
//         });

//       } else {
//       }
//     } else {

//     }

//   });
// }
// getDepartments();
// export function getcity(selectcity) {

//   let filterParameters = {};
//   let filterAnd = {};
//   let filterOr = {};

//   const queryString = selectcity;


//   var ce_departments = [];
//   // $('.checkbox_departments').each(function () {
//   //   if ($(this).is(":selected")) {
//   ce_departments.push(queryString);
//   //   }
//   // });

//   // if (ce_departments.length > 0) {
//   filterAnd = { "$and": [{ "address.countryCode": { "$in": ce_departments } }] };

//   // }

//   filterParameters = { ...filterAnd };
//   var filterpar = JSON.stringify(filterParameters);
//   var filter = encodeURI(filterpar);


//   var baseURL = "https://liveapi.yext.com/v2/accounts/me/entities?";
//   var api_key = "308d4d3f6ae747ccda5a5c0bbb8249a6";
//   var vparam = "20161012";
//   var entityTypes = "location";
//   var savedFilterId = "1160385474";

//   var request_url =
//     baseURL +
//     "api_key=" +
//     api_key +
//     "&v=" +
//     vparam +
//     "&resolvePlaceholders=true" +
//     "&filter=" +
//     filter
//   "&entityTypes=" +
//     entityTypes +
//     "&savedFilterIds=" +
//     savedFilterId;

//   fetch(request_url).then(response => response.json()).then(result => {

//     if (!result.errors) {

//       var html = '';
//       html += '<div class=" department-list1 flex justify-center">';
//       html += '  <div class="mb-3 xl:w-96">';
//       html += `   <select id="mySelect1" class=" checkbox_departments1 form-select appearance-none
//                          block
//                         w-full
//                         px-3
//                         py-1.5
//                         text-base
//                         font-normal
//                         text-gray-700
//                         bg-white bg-clip-padding bg-no-repeat
//                         border border-solid border-gray-300
//                         rounded
//                         transition
//                         ease-in-out
//                         m-0
//                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">`;


//       html += '<option>' + "CITY" + '</option>';       // html+= '<option selected>Open this select menu</option>';     
//       $.each(result.response.entities, function (index, entity) {
//         console.log(entity);

//         html += '<option value="' + entity.address.city + '">' + entity.address.city + '</option>';



//       });
//       html += '</select>';
//       html += '</div>';
//       html += '</div>';

//       $(".filtering2").html(html);
//       $(".checkbox_departments1").change(function () {
//         var x = document.getElementById("mySelect1").selectedIndex;
//         let selectcity = document.getElementsByTagName("option")[x].value;
//         // alert(selectcity);
//         // alert($('checkbox_departments:selected').text());
//         getshop(selectcity);
//       });
//     }

//   });
// }
// getcity("");


export function getshop(selectcity) {

  let filterParameters = {};
  let filterAnd = {};
  let filterOr = {};

  const queryString = selectcity;


  var ce_departments = [];
  // $('.checkbox_departments').each(function () {
  //   if ($(this).is(":selected")) {
  ce_departments.push(queryString);
  //   }
  // });

  // if (ce_departments.length > 0) {
  filterAnd = { "$and": [{ "address.city": { "$in": ce_departments } }] };

  // }

  filterParameters = { ...filterAnd };
  var filterpar = JSON.stringify(filterParameters);
  var filter = encodeURI(filterpar);


  var baseURL = "https://liveapi.yext.com/v2/accounts/me/entities?";
  var api_key = "308d4d3f6ae747ccda5a5c0bbb8249a6";
  var vparam = "20161012";
  var entityTypes = "location";
  var savedFilterId = "1160385474";

  var request_url =
    baseURL +
    "api_key=" +
    api_key +
    "&v=" +
    vparam +
    "&resolvePlaceholders=true" +
    "&filter=" +
    filter
  "&entityTypes=" +
    entityTypes +
    "&savedFilterIds=" +
    savedFilterId;

  fetch(request_url).then(response => response.json()).then(result => {

    if (!result.errors) {

      var html = '';
      html += '<div class=" department-list1 flex justify-center">';
      html += '  <div class="mb-3 xl:w-96">';
      html += `   <select class=" checkbox_departments1 form-select appearance-none
                         block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">`;
      // html+= '<option selected>Open this select menu</option>';     
      html += '<option>' + "SHOPS" + '</option>';

      $.each(result.response.entities, function (index, entity) {
        console.log(entity);

        html += '<option value="' + entity.name + '">' + entity.name + '</option>';

      });
      html += '</select>';
      html += '</div>';
      html += '</div>';

      $(".filtering3").html(html);

    }
  })
}
getshop("");



export function getUsersLocation() {
  if (navigator.geolocation) {
    startLoading();
    const error = (error) => {
      [].slice
        .call(document.querySelectorAll(".error-text") || [])
        .forEach(function (el) {
          el.textContent =
            "Unable to determine your location. Please try entering a location in the search bar.";
        });
      stopLoading();
    };
    navigator.geolocation.getCurrentPosition(getNearestLatLng, error, {
      timeout: 10000,
    });
  }
}

export function getLocationsfordsc() {
  let request_url =
    base_url +
    "entities" +
    "?limit=" +
    limit +
    "&offset=" +
    offset +
    '&sortBy=[{"name":"DESCENDING"}]';
  let filterParameters = {};
  let filterAnd = {};
  let filterOr = {};

  const queryString = locationInput.value;

  // if (queryString) {

  //   filterOr = {
  //     "$or": [
  //       { "address.line1": { "$contains": queryString } },
  //       { "address.city": { "$contains": queryString } },
  //       { "address.region": { "$contains": queryString } },
  //       { "address.countryCode": { "$contains": queryString } },
  //       { "address.postalCode": { "$contains": queryString } },
  //       { "name": { "$contains": queryString } }
  //     ]
  //   };

  // }


  // if (queryString) {

  //   filterOr = {
  //     "$or": [
  //       { "address.line1": { "$eq": queryString } },
  //       { "address.city": { "$eq": queryString } },
  //       { "address.region": { "$eq": queryString } },
  //       { "address.countryCode": { "$eq": queryString } },
  //       { "address.postalCode": { "$eq": queryString } },
  //       { "name": { "$eq": queryString } }
  //     ]
  //   };

  // }

  // var ce_departments = [];
  // $('.checkbox_departments').each(function () {
  //   if ($(this).is(":checked")) {
  //     ce_departments.push($(this).val());
  //   }
  // });

  // if (ce_departments.length > 0) {
  //   filterAnd = { "$and": [{ "c_departments": { "$in": ce_departments } }] };

  // }

  filterParameters = { ...filterOr, ...filterAnd };
  var filterpar = JSON.stringify(filterParameters);
  var filter = encodeURI(filterpar);
  if (filter) {
    request_url += "&filter=" + filter;
  }
  getRequest(request_url, null);
}


// function for ascending data
// function ASC() {
//   let request_url =
//     base_url +
//     "entities" +
//     "?limit=" +
//     limit +

//     '&sortBy=[{"name":"ASCENDING"}]';


//     getRequest(request_url, null);
//   }

// // function for DESending
// function DESC() {
//   let request_url =
//     base_url +
//     "entities" +
//     "?limit=" +
//     limit +

//     '&sortBy=[{"name":" DESCENDING"}]';


//     getRequest(request_url, null);
//   }

//Paginate function 
// export function paginate(
//   totalItems: number,
//   currentPage: number = 1,
//   pageSize: number = 5,
//   maxPages: number = 5
// ) {
//   // calculate total pages
//   let totalPages = Math.ceil(totalItems / pageSize);

//   // ensure current page isn't out of range
//   if (currentPage < 1) {
//     currentPage = 1;
//   } else if (currentPage > totalPages) {
//     currentPage = totalPages;
//   }

//   let startPage: number, endPage: number;
//   if (totalPages <= maxPages) {
//     // total pages less than max so show all pages
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     // total pages more than max so calculate start and end pages
//     let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
//     let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
//     if (currentPage <= maxPagesBeforeCurrentPage) {
//       // current page near the start
//       startPage = 1;
//       endPage = maxPages;
//     } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
//       // current page near the end
//       startPage = totalPages - maxPages + 1;
//       endPage = totalPages;
//     } else {
//       // current page somewhere in the middle
//       startPage = currentPage - maxPagesBeforeCurrentPage;
//       endPage = currentPage + maxPagesAfterCurrentPage;
//     }
//   }

//   // calculate start and end item indexes
//   let startIndex = (currentPage - 1) * pageSize;
//   let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//   // create an array of pages to ng-repeat in the pager control
//   let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);



//   // return object with all pager properties required by the view
//   return {
//     totalItems: totalItems,
//     currentPage: currentPage,
//     pageSize: pageSize,
//     totalPages: totalPages,
//     startPage: startPage,
//     endPage: endPage,
//     startIndex: startIndex,
//     endIndex: endIndex,
//     pages: pages
//   };
// }





// //appendpagination and renderPagination function's
// function appendpagination(pagesLinks) {
//   var pages = pagesLinks.pages;
//   var tPages = pagesLinks.totalPages;
//   var currentPage = pagesLinks.currentPage;
//   if (pages.length > 1) {
//     var html = "<div class = 'flex-inline bg-gray-300'>";
//     html += "<ul class='pagination inline-flex font-bold  pr-5 p-2 px-2 '>";
//      if (currentPage > 1) {


//      html += '<li><a href="#" class="pg-btn relative inline-flex items-center px-2 border-black bg-white text-lg  text-black hover:bg-red-200 " data-id="1">view more</a></li>';
//       html += '<li><a href="#" class="pg-btn relative inline-flex items-center px-2 border-black bg-white text-lg  text-black hover:bg-red-200 " data-id=' + (currentPage - 1) + '><</a></li>';

//      }
//     pages.forEach((e) => {
//       var isActive = "";
//       if (e == currentPage) {
//         isActive = "active";
//       }
//       html += '<li><a href="#" class="' + isActive + 'pg-btn relative inline-flex text-lg  px-2" data-id=' + e + ' style = "background-color: white;" > ' + e + '</a></li>';
//     })
//     if (tPages !== currentPage) {


//       html += '<li><a href="#" class="pg-btn relative inline-flex items-center px-2 border-black bg-white text-lg  text-black hover:bg-red-200" data-id=' + (currentPage + 1) + '>></a></li>';

//       html += '<li><a href="#" class="pg-btn relative inline-flex items-center px-2 border-black bg-white text-lg  text-black hover:bg-red-200 "data-id=' + tPages + '>Last</a></li>';

//     }
//     html += "</ul></div>";
//   }
//   else {
//     html = "";
//   }
//   $('.pagination-button').empty();
//   $('.pagination-button').append(html);

// }



// export function renderPagination(pagesLinks, count = 0) {
//   appendpagination(pagesLinks);
//   setTimeout(() => {
//     $(document).on('click', '.pg-btn', function () {

//       var dataId = $(this).attr('data-id');
//       let newOffset = (limit * Number(dataId)) - (limit);
//       offset = newOffset;
//       getLocations(newOffset, false);
//       const pagesLinks = paginate(count, parseInt(dataId), limit, 5);

//       appendpagination(pagesLinks);
//     });
//   }, 1000);
// }
// getLocations(0, true);
// let offset1 =+ 10;
// let limt1 =+ 50;
// document.getElementById("view").onclick= function () {
// let offset=+offset1;
// let limt=+limt1;

//   let request_url =
//     base_url +
//     "entities" +
//     "?limit=" +
//     limit +
//     "&offset=" +
//     offset +
//     '&sortBy=[{"name":"ASCENDING"}]';

//   let filterParameters = {};
//   let filterAnd = {};
//   let filterOr = {};

//   const queryString = locationInput.value;

//   if (queryString) {

//     filterOr = {
//       "$or": [
//         { "address.line1": { "$eq": queryString } },
//         { "address.city": { "$eq": queryString } },
//         { "address.region": { "$eq": queryString } },
//         { "address.countryCode": { "$eq": queryString } },
//         { "address.postalCode": { "$eq": queryString } },
//         { "name": { "$eq": queryString } }
//       ]
//     };
//   }

//   var ce_departments = [];
//   $('.checkbox_departments').each(function () {
//     if ($(this).is(":checked")) {
//       ce_departments.push($(this).val());
//     }
//   });

//   if (ce_departments.length > 0) {
//     filterAnd = { "$and": [{ "c_company_services": { "$in": ce_departments } }] };

//   }

//   filterParameters = { ...filterOr, ...filterAnd };
//   var filterpar = JSON.stringify(filterParameters);
//   var filter = encodeURI(filterpar);

//   if (filter) {
//     request_url += "&filter=" + filter;
//   }

//   getRequest(request_url, null);

// }

// export function getslider() {
//   var baseURL = "https://liveapi.yext.com/v2/accounts/me/entities?";
//   var api_key = "308d4d3f6ae747ccda5a5c0bbb8249a6";
//   var vparam = "20161012";
//   var entityTypes = "location";
//   var savedFilterId = "1160385474";
//   var fullURL =
//     baseURL +
//     "api_key=" +
//     api_key +
//     "&v=" +
//     vparam +
//     "&resolvePlaceholders=true" +
//     "&entityTypes=" +
//     entityTypes +
//     "&savedFilterIds=" +
//     savedFilterId +
//     "&limit=50";
//     var html = "";
//     var $this = $('#result-');
//     var storelocationName = $this.find('.storelocation-name').html();
//     var address = $this.find('.address').html();
//     var phone = $this.find('.phone').html();
//     console.log(storelocationName);
  

//   fetch(fullURL).then(response => response.json()).then(result => {
//     if (!result.errors) {

    
//       if (result.response.count > 0) {
//         html += '<div class="infopage w-48 md:w-[350px] font-normal text-xs leading-6">';
//         html += '<div class="nameData font-bold text-sm md:text-base">' + storelocationName + '</div>';
//         html += '<div class="addressData">' + address + '</div>';
//         html += '<div class="phone text-sm mb-2 mt-2">' + phone + "</div>";
//         html += '</div>';
//         $(".").html(html);
//       }
//     }
//   });
// }
  $("#result").click(function(){
  var $this = $("#result2");
  //  var location_name = $this.data('name');            
  var storelocationName = $this.find('.storelocation-name').html();
  var address = $this.find('.address').html();
  var phone= $this.find('.phone').html();
   var openCloseTime = $this.find('.storelocation-openCloseTime').html();


  var markerContent = '<div class="markerContent font-normal text-xs leading-5">';

  markerContent += '<div class="nameData">'+storelocationName+'</div>';
  markerContent += '<div class="addressData max-w-[260px]">'+address+'</div>';
  markerContent += '<div class="phone mb-2">' +phone+ "</div>";
  if
    (openCloseTime)
    {
  markerContent += '<div class="openCloseTimeData capitalize">'+openCloseTime+'</div>';
    }

  markerContent += '</div>';
});
  // console.log(markerContent);
    
  // var mapZoom  = map.getZoom();
  // var mapCenter  = map.getCenter();
  
