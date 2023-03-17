const api = parent.Xrm.WebApi.online;

function constructClassUrl(classId) {
  if (!classId) return "#";
  const baseURL =
    "https://kbrewster.crm.dynamics.com/main.aspx?appid=bb5d4000-cbb2-ed11-83fd-6045bdda33d1&pagetype=entityrecord&etn=crdae_class&id=";
  return baseURL + classId;
}

function constructVenueUrl(venueId) {
  if (!venueId) return "#";
  const baseURL =
    "https://kbrewster.crm.dynamics.com/main.aspx?appid=bb5d4000-cbb2-ed11-83fd-6045bdda33d1&pagetype=entityrecord&etn=crdae_venue&id=";
  return baseURL + venueId;
}
function getInstructorInfo(instructorId) {
  if (!instructorId) return;
  return api
    .retrieveRecord("crdae_instructor", instructorId)
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.error(error);
      return {
        status: 400,
        message: "Could not find instructor",
      };
    });
}

function getVenueInfo(venueId) {
  if (!venueId) return;
  return api
    .retrieveRecord("crdae_venue", venueId)
    .then((results) => {
      return results;
    })
    .catch((error) => {
      console.error(error);
      return {
        status: 400,
        message: "Could not find venue",
      };
    });
}

function convertDateTime(utcTime) {
  let utcDate = new Date(utcTime);
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return utcDate.toLocaleDateString("en-US", options);
}

function Main() {
  try {
    // get api
    // Get doc elements
    const body = document.getElementById("root");
    const list = document.getElementById("class-list");
    // Add a header to the body of the doc
    const h2 = document.createElement("h2");
    h2.textContent = "Active Classes";
    h2.classList.add("all-active-classes-header");
    body.prepend(h2);

    // Get all active classes and post them as listItems in the html web resource
    const fetchXml = "?$filter=statecode eq 0";
    api
      .retrieveMultipleRecords("crdae_class", fetchXml)
      .then(({ entities }) => {
        // entities represents an array of each entity, which is of-course an object
        entities.forEach(async (entity) => {
          // Start creating the elements
          const listItem = document.createElement("div");
          listItem.classList.add("grid-item");
          // The grid is what will contain the rest of the children
          const grid = document.createElement("div");
          grid.classList.add("grid-container", "class-card");
          listItem.append(grid);

          //#region Quadrant 1 : Title & Instructor
          const quad1 = document.createElement("div");
          quad1.classList.add("sub-grid-item");

          const classTitle = document.createElement("p");
          classTitle.classList.add("class-title");
          classTitle.textContent = entity.crdae_name;
          const instructor = document.createElement("p");
          // get instructor information
          const instructorInfo = await getInstructorInfo(
            entity._crdae_leadinstructor_value
          );
          instructor.classList.add("instructor-name");
          instructor.textContent = instructorInfo.crdae_lastname || "---";
          const iButton = document.createElement("button");
          // Add the buttons attributes and such
          iButton.classList.add("link-to-class");
          iButton.textContent = "Go to Class";
          iButton.onclick = function () {
            try {
              parent.location.href = constructClassUrl(entity.crdae_classid);
            } catch (error) {
              console.error(error);
            }
          };
          // APPEND
          quad1.append(classTitle, instructor, iButton);
          grid.append(quad1);
          //#endregion

          //#region Quadrant 2 : Credits
          const quad2 = document.createElement("div");
          quad2.classList.add("sub-grid-item", "credits");
          const q2p = document.createElement("p");
          q2p.classList.add("credits");
          const q2pHTML = `Credits: <span class="credits-value">${
            entity.afs_credits || "--"
          }</span>`;
          q2p.innerHTML = q2pHTML;
          // APPEND
          quad2.append(q2p);
          grid.append(quad2);
          //#endregion

          //#region Quadrant 3 : Location
          const quad3 = document.createElement("div");
          quad3.classList.add("sub-grid-item", "location");
          const q3p = document.createElement("p");
          q3p.classList.add("location-title");
          q3p.textContent = "Location";
          const lButton = document.createElement("button");
          const venueInfo = await getVenueInfo(entity._crdae_venue_value);
          lButton.textContent = venueInfo?.crdae_name || "---"; // SWITCH FOR CORRECT VARIABLE
          lButton.onclick = function () {
            try {
              parent.location.href = constructVenueUrl(
                entity._crdae_venue_value
              );
            } catch (error) {
              console.error(error);
            }
          };
          quad3.append(q3p, lButton);
          grid.append(quad3);
          //#endregion

          //#region Quadrant 4 : DatesTimes
          const quad4 = document.createElement("div");
          quad4.classList.add("sub-grid-item", "dates");
          const start = document.createElement("p");
          start.classList.add("start-date-time");
          start.innerHTML = `Start date:`;
          const startdate = document.createElement("p");
          startdate.classList.add("dates-value");
          startdate.textContent = convertDateTime(entity.crdae_startdatetime);
          const end = document.createElement("p");
          end.classList.add("end-date-time");
          end.innerHTML = `End date:`;
          const enddate = document.createElement("p");
          enddate.classList.add("dates-value");
          enddate.textContent = convertDateTime(entity.crdae_enddatetime);
          quad4.append(start, startdate, end, enddate);
          grid.append(quad4);
          //#endregion

          list.append(listItem);
        });
      })
      .catch((exception) => {
        console.error(exception);
      });
  } catch (exception) {
    console.error(exception);
  }
}

window.addEventListener("load", Main, function (error) {
  console.error(error);
});
