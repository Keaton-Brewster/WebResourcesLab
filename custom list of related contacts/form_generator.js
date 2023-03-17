window.addEventListener(
  "load",
  () => {
    const formContext = parent.Xrm.Page;
    const recordId = formContext.data.entity.getId();
    const api = parent.Xrm.WebApi.online;

    const fetchXml = `?$filter=parentcustomerid_account/accountid eq ${recordId}`;

    api.retrieveMultipleRecords("contact", fetchXml).then(({ entities }) => {
      const users = entities;
      const ul = document.getElementById("ulist");

      let column = 1;
      //then
      users.forEach((user) => {
        // Create the list item and div elements for containing the user information
        const listItem = document.createElement("div");
        listItem.classList.add("user-card");
        listItem.classList.add(`column-${column}`);
        if (column == 1) column = 2;
        else column = 1;

        // Start creating the information for each user

        //#region  PROFILE PICTURE
        const img = document.createElement("img");
        img.classList.add("profile-pic");
        img.src =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        img.setAttribute("alt", `A head-shot of ${user.fullname}`);
        img.setAttribute("width", "140px");
        img.setAttribute("height", "140px");
        //Append the image
        listItem.append(img);
        //#endregion

        //#region NAME
        const h3 = document.createElement("h3");
        h3.classList.add("name");
        h3.innerHTML = `${user.fullname}`;
        //append the header
        listItem.append(h3);
        //#endregion

        //#region AGE
        const age = document.createElement("p");
        age.classList.add("age");
        age.innerHTML = `Birthdate: ${user.birthdate || "---"}`;
        //append the <p>age</p>
        listItem.append(age);
        //#endregion

        //#region LOCATION
        const location = document.createElement("div");
        location.classList.add("address-information");
        listItem.append(location);
        // Address header
        const h4 = document.createElement("h4");
        h4.classList.add("address-header");
        h4.innerHTML = "Address Information";
        location.append(h4);
        // Address line 1
        const line1 = document.createElement("li");
        line1.classList.add("address-line1");
        line1.innerHTML = `${user.address1_line1} ${user.address1_line2 || ""}`;
        location.append(line1);
        // Address line 2
        const line2 = document.createElement("li");
        line2.classList.add("address-line2");
        line2.innerHTML = `${user.address1_city}, ${user.address1_stateorprovince}`;
        location.append(line2);
        // Country line
        const line3 = document.createElement("li");
        line3.classList.add("country");
        line3.innerHTML = `${user.address1_country} ${user.address1_postalcode}`;
        location.append(line3);
        //#endregion

        //#region BR
        const br = document.createElement("br");
        listItem.append(br);
        //#endregion

        //#region LINK
        const button = document.createElement("button");
        button.onclick = () => {
          // window.location.href = `https://kbrewster.crm.dynamics.com/main.aspx?appid=2a4e6f76-f5df-44d3-bbb1-92ff132afe7e&pagetype=entityrecord&etn=contact&id=${user.id}`;
          return;
        };
        button.classList.add("link");
        button.innerHTML = "Contact";
        listItem.append(button);
        //#endregion

        // Append the each list item to the list
        ul.append(listItem);
      });
    });
  },
  (exception) => {
    console.error(exception);
  }
);
