var Theme;
var Theme_Button = document.getElementById("Theme-Change-Button");
if (window.localStorage.getItem("Theme") != null) {
  Theme = window.localStorage.getItem("Theme") == "1" ? true : false;
  Load_Theme(Theme);
} else {
  Theme = true;
  window.localStorage.setItem("Theme", Theme);
  Theme_Button.style.left = Theme ? "-31px" : "31px";
}
var Piority = 1;
var timer = true;
var Piority_Button = document.getElementById("Choose-Piority-Button");
Piority_Button.style.left = Piority * 55 + "px";
var Add_Task_Pin_State = false;
var Task_containers = [
  document.getElementById("Important-Task-Conatiner"),
  document.getElementById("Normal-Task-Conatiner"),
  document.getElementById("Not-Important-Task-Conatiner"),
];
var Searching = false;
var Task_Content_Arr = [];
var Task_UnSorted_Id_Arr = [];
var Task_Sorted_Id_Arr = [];
var Length = [0, 0, 0];
Create_Arrays(Task_Content_Arr, 3, 9, false, true);
Create_Arrays(Task_Sorted_Id_Arr, 3, 9, false, false);
Create_Arrays(Task_UnSorted_Id_Arr, 3, 9, false, false);
if (window.localStorage.getItem("Saved")) {
  Task_Content_Arr[0] = JSON.parse(
    window.localStorage.getItem("0_Container_Content")
  );
  Task_Content_Arr[1] = JSON.parse(
    window.localStorage.getItem("1_Container_Content")
  );
  Task_Content_Arr[2] = JSON.parse(
    window.localStorage.getItem("2_Container_Content")
  );
  Task_UnSorted_Id_Arr[0] = JSON.parse(
    window.localStorage.getItem("0_Container_Unsorted_Id")
  );
  Task_UnSorted_Id_Arr[1] = JSON.parse(
    window.localStorage.getItem("1_Container_Unsorted_Id")
  );
  Task_UnSorted_Id_Arr[2] = JSON.parse(
    window.localStorage.getItem("2_Container_Unsorted_Id")
  );
} else {
  Create_Arrays(Task_Content_Arr, 3, 9, false, true);
  Create_Arrays(Task_Sorted_Id_Arr, 3, 9, false, false);
  Create_Arrays(Task_UnSorted_Id_Arr, 3, 9, false, false);
}
Sort_Arr(0, null);
Sort_Arr(1, null);
Sort_Arr(2, null);
function Create_Arrays(Array, numRows, numCols, One, Three) {
  for (let i = 0; i < numRows; i++) {
    if (!One) {
      const row = [];
      if (Three) {
        const arr = [];
        for (let j = 0; j < 3; j++) {
          arr.push(null);
        }
        for (let j = 0; j < numCols; j++) {
          row.push(arr);
        }
      } else {
        for (let j = 0; j < numCols; j++) {
          row.push(null);
        }
      }
      Array.push(row);
    } else {
      for (let j = 0; j < numCols; j++) {
        Array.push(null);
      }
    }
  }
}
function Sort_Arr(Piority, Start_Text) {
  let Pinned_NChecked_Arr = [];
  let Pinned_Checked_Arr = [];
  let NPinned_NChecked_Arr = [];
  let NPinned_Checked_Arr = [];
  Create_Arrays(Pinned_NChecked_Arr, 0, 9, true, false);
  Create_Arrays(Pinned_Checked_Arr, 0, 9, true, false);
  Create_Arrays(NPinned_NChecked_Arr, 0, 9, true, false);
  Create_Arrays(NPinned_Checked_Arr, 0, 9, true, false);
  let indexes = [0, 0, 0, 0];
  Task_UnSorted_Id_Arr[Piority].forEach((value) => {
    if (value != null) {
      let Array = Task_Content_Arr[Piority][value];

      if (Array[0]) {
        const Pinned = Array[2];
        const Checked = Array[1];
        if (Pinned && !Checked) {
          Pinned_NChecked_Arr[indexes[0]] = value;
          indexes[0]++;
        } else if (Pinned && Checked) {
          Pinned_Checked_Arr[indexes[1]] = value;
          indexes[1]++;
        } else if (!Pinned && !Checked) {
          NPinned_NChecked_Arr[indexes[2]] = value;
          indexes[2]++;
        } else if (!Pinned && Checked) {
          NPinned_Checked_Arr[indexes[3]] = value;
          indexes[3]++;
        }
      }
    }
  });
  Task_Sorted_Id_Arr[Piority] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  let Sort_Index = 0;
  Pinned_NChecked_Arr.forEach((element) => {
    if (element != null) {
      if (
        Start_Text &&
        Task_Content_Arr[Piority][element][0]
          .toLowerCase()
          .startsWith(Start_Text.toLowerCase())
      ) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      } else if (!Start_Text) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      }
    }
  });
  Pinned_Checked_Arr.forEach((element) => {
    if (element != null) {
      if (
        Start_Text &&
        Task_Content_Arr[Piority][element][0]
          .toLowerCase()
          .startsWith(Start_Text.toLowerCase())
      ) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      } else if (!Start_Text) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      }
    }
  });
  NPinned_NChecked_Arr.forEach((element) => {
    if (element != null) {
      if (
        Start_Text &&
        Task_Content_Arr[Piority][element][0]
          .toLowerCase()
          .startsWith(Start_Text.toLowerCase())
      ) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      } else if (!Start_Text) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      }
    }
  });
  NPinned_Checked_Arr.forEach((element) => {
    if (element != null) {
      if (
        Start_Text &&
        Task_Content_Arr[Piority][element][0]
          .toLowerCase()
          .startsWith(Start_Text.toLowerCase())
      ) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      } else if (!Start_Text) {
        Task_Sorted_Id_Arr[Piority][Sort_Index] = element;
        Sort_Index++;
      }
    }
  });
  while (Task_containers[Piority].firstChild) {
    Task_containers[Piority].removeChild(Task_containers[Piority].firstChild);
  }
  Task_Sorted_Id_Arr[Piority].forEach((element) => {
    if (element != null && Task_Content_Arr[Piority][element][0] != null) {
      Create_And_Instantiate_Element(
        Piority,
        Task_Content_Arr[Piority][element][0],
        Task_Content_Arr[Piority][element][1],
        Task_Content_Arr[Piority][element][2],
        element,
        false
      );
    }
  });

  Pinned_Checked_Arr.forEach((element) => {
    var Text_Content = document.getElementById(
      "Par:" + Piority + ":" + element
    );
    if (Text_Content) Text_Content.style.textDecoration = "line-through";
  });
  NPinned_Checked_Arr.forEach((element) => {
    var Text_Content = document.getElementById(
      "Par:" + Piority + ":" + element
    );
    if (Text_Content) Text_Content.style.textDecoration = "line-through";
  });
  Add_Task_Pin_State = false;
  var Pin = document.getElementById("Pin-Task-Button");
  Pin.setAttribute("src", "assests/pin.svg");
  window.localStorage.setItem("Saved", true);
  window.localStorage.setItem(
    `${0}_Container_Content`,
    JSON.stringify(Task_Content_Arr[0])
  );
  window.localStorage.setItem(
    `${1}_Container_Content`,
    JSON.stringify(Task_Content_Arr[1])
  );
  window.localStorage.setItem(
    `${2}_Container_Content`,
    JSON.stringify(Task_Content_Arr[2])
  );
  window.localStorage.setItem(
    `${0}_Container_Unsorted_Id`,
    JSON.stringify(Task_UnSorted_Id_Arr[0])
  );
  window.localStorage.setItem(
    `${1}_Container_Unsorted_Id`,
    JSON.stringify(Task_UnSorted_Id_Arr[1])
  );
  window.localStorage.setItem(
    `${2}_Container_Unsorted_Id`,
    JSON.stringify(Task_UnSorted_Id_Arr[2])
  );
}
function Change_Theme() {
  Theme = !Theme;
  window.localStorage.setItem("Theme", Theme ? "1" : "0");
  Load_Theme(Theme);
}
function Load_Theme(theme) {
  Theme_Button.style.left = theme ? "-31px" : "31px";
  document.documentElement.style.setProperty(
    "--Current1-Color",
    theme ? "#212529db" : "#a2a2a2"
  );
  document.documentElement.style.setProperty(
    "--Current2-Color",
    theme ? "#343a40af" : "#bdbdbde1"
  );
  document.documentElement.style.setProperty(
    "--Current3-Color",
    theme ? "#495057db" : "#dfdfdfe7"
  );
  document.documentElement.style.setProperty(
    "--Current4-Color",
    theme ? "#6c757dc9" : "#efefef"
  );
  document.documentElement.style.setProperty(
    "--Current5-Color",
    theme ? "#343a40db" : "#cacacad7"
  );
  document.documentElement.style.setProperty(
    "--Hover-Color",
    theme ? "#adb5bd96" : "#bfbfbfe7"
  );
}
function Show_Add_Task_Container() {
  var Add_Task_Window = document.getElementById("Add-Task-Window");
  Add_Task_Window.style.scale = "1";
}
function Return_Task_To_Default() {
  var Add_Task_Window = document.getElementById("Add-Task-Window");
  Add_Task_Window.style.scale = "0";
  Piority = 1;
  Piority_Button.style.left = Piority * 55 + "px";
  Clear_Content("Task-Content");
  Add_Task_Pin_State = false;
  var Pin = document.getElementById("Pin-Task-Button");
  Pin.setAttribute("src", "assests/pin.svg");
}
function Clear_Content(id) {
  var Content = document.getElementById(id);
  Content.value = null;
  if (!Searching) {
    Sort_Arr(0, null);
    Sort_Arr(1, null);
    Sort_Arr(2, null);
  } else {
    var Search_Text = document.getElementById("Search-Text").value;
    Sort_Arr(0, Search_Text);
    Sort_Arr(1, Search_Text);
    Sort_Arr(2, Search_Text);
  }
}
function Change_Piority() {
  Piority = Piority > 1 ? 0 : Piority + 1;
  Piority_Button.style.left = Piority * 55 + "px";
}
function Add_Task_Pin() {
  Add_Task_Pin_State = !Add_Task_Pin_State;
  var Pin = document.getElementById("Pin-Task-Button");
  Pin.setAttribute(
    "src",
    Add_Task_Pin_State ? "assests/pinned.svg" : "assests/pin.svg"
  );
}
function Add_Task() {
  if (Length[Piority] < 9) {
    var Text = document.getElementById("Task-Content");
    Create_And_Instantiate_Element(
      Piority,
      Text.value,
      false,
      Add_Task_Pin_State,
      Get_ID(Piority),
      true
    );
    Length[Piority]++;
  }
  Return_Task_To_Default();
}
function Get_ID(Piority) {
  for (let index = 0; index < Task_UnSorted_Id_Arr[Piority].length; index++) {
    const element = Task_UnSorted_Id_Arr[Piority][index];

    if (element != 0 && !element) {
      return index;
    }
  }
}
function Check_Task(Parent, id) {
  var Check_Box_Icon = document.getElementById("Check:" + Parent + ":" + id);
  var src = Check_Box_Icon.getAttribute("src");
  var Checked = src == "assests/Check-Box.svg" ? false : true;
  Checked = !Checked;
  Task_Content_Arr[Parent][id][1] = Checked;
  console.log(Searching);
  console.log(Searching);
  if (!Searching) Sort_Arr(Parent, null);
  else {
    var Search_Text = document.getElementById("Search-Text").value;
    Sort_Arr(Parent, Search_Text);
  }
}
function Pin_Task(Parent, id) {
  var Pin_Icon = document.getElementById("Pin:" + Parent + ":" + id);
  var src = Pin_Icon.getAttribute("src");
  var Pinned = src == "assests/pinned.svg" ? true : false;
  Pinned = !Pinned;
  Task_Content_Arr[Parent][id][2] = Pinned;
  console.log(Searching);
  if (!Searching) Sort_Arr(Parent, null);
  else {
    var Search_Text = document.getElementById("Search-Text").value;
    Sort_Arr(Parent, Search_Text);
  }
}
function Delete_Task(Parent, id) {
  var child = document.getElementById(id);
  if (child.parentNode === Task_containers[Parent])
    Task_containers[Parent].removeChild(child);
  Length[Parent]--;
  Task_UnSorted_Id_Arr[Parent][id] = null;
  Task_Content_Arr[Parent][id] = [null, null, null];
  console.log(Searching);
  if (!Searching) Sort_Arr(Parent, null);
  else {
    var Search_Text = document.getElementById("Search-Text").value;
    Sort_Arr(Parent, Search_Text);
  }
}
function Create_And_Instantiate_Element(
  Parent,
  Task_Text,
  Check_State,
  Pin_State,
  id,
  Sort
) {
  var Task_Element = document.createElement("div");
  Task_Element.classList.add("Task-Background");
  Task_Element.setAttribute("id", id);
  var innerContainer = document.createElement("div");
  innerContainer.classList.add("Task-Bar-Container", "Container");
  var paragraph = document.createElement("p");
  paragraph.classList.add("Task-Content");
  paragraph.setAttribute("id", "Par:" + Parent + ":" + id);
  paragraph.textContent = Task_Text.length < 1 ? "No Text" : Task_Text;
  var checkboxButton = document.createElement("button");
  checkboxButton.classList.add("Check-Box-Button", "Task-Btn");
  checkboxButton.setAttribute(
    "onclick",
    "Check_Task(" + Parent + "," + id + ")"
  );
  var checkboxIcon = document.createElement("img");
  checkboxIcon.src = "assests/Check-Box.svg";
  checkboxIcon.alt = "Check-Box";
  checkboxIcon.classList.add("Check-Box-Icon", "Task-Icon");
  checkboxIcon.setAttribute("id", "Check:" + Parent + ":" + id);
  checkboxIcon.setAttribute(
    "src",
    Check_State ? "assests/Checked-Box.svg" : "assests/Check-Box.svg"
  );
  checkboxButton.appendChild(checkboxIcon);
  var pinButton = document.createElement("button");
  pinButton.classList.add("Task-Pin-Button", "Task-Btn");
  pinButton.setAttribute("onclick", "Pin_Task(" + Parent + "," + id + ")");
  var pinIcon = document.createElement("img");
  pinIcon.src = Pin_State ? "assests/pinned.svg" : "assests/pin.svg";
  pinIcon.alt = "Pin";
  pinIcon.setAttribute("id", "Pin:" + Parent + ":" + id);
  pinIcon.classList.add("Pin-Icon", "Task-Icon");
  pinButton.appendChild(pinIcon);
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("Task-Delete-Button", "Task-Btn");
  deleteButton.setAttribute(
    "onclick",
    "Delete_Task(" + Parent + "," + id + ")"
  );
  var deleteIcon = document.createElement("img");
  deleteIcon.src = "assests/delete.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("Delete-Icon", "Task-Icon");
  deleteButton.appendChild(deleteIcon);
  innerContainer.appendChild(paragraph);
  innerContainer.appendChild(checkboxButton);
  innerContainer.appendChild(pinButton);
  innerContainer.appendChild(deleteButton);
  Task_Element.appendChild(innerContainer);
  Task_containers[Parent].appendChild(Task_Element);
  Task_Content_Arr[Parent][id] = [
    Task_Text.length < 1 ? "No Text" : Task_Text,
    Check_State,
    Pin_State,
  ];
  Task_UnSorted_Id_Arr[Parent][id] = id;
  if (Sort) {
    Sort_Arr(Parent, null);
  }
}
document.getElementById("Search-Text").addEventListener("change", () => {
  var Search_Text = document.getElementById("Search-Text").value;
  if (Search_Text) {
    console.log("text : " + Search_Text);
    Sort_Arr(0, Search_Text);
    Sort_Arr(1, Search_Text);
    Sort_Arr(2, Search_Text);
    Searching = true;
  } else {
    Sort_Arr(0, null);
    Sort_Arr(1, null);
    Sort_Arr(2, null);
    Searching = false;
  }
});
