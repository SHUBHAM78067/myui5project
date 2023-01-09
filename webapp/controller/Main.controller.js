sap.ui.define(
  [
    "mickey/controller/BaseController",
    "mickey/models/model",
    "sap/m/MessageToast",
  ],
  //call back which will get called when all dependencies are loaded
  function (BaseController, Model, MessageToast) {
    return BaseController.extend("mickey.controller.Main", {
      anotherFx: function () {
        //this- is the default object of current class - Main Controller
        //in OOPS ABAP it is compared with - ME
        var oView = this.getView();
        //From the view, we will get the control object
        //Opt 1
        var oInp = oView.byId("idInp");
        //Opt 2
        var oInp2 = this.oCore.byId("idXMLView--idInp");
        //Print the value
        alert(oInp.getValue());

        //alert("my xml view is live in action 😊");
      },
      onSelect1: function (oEvent) {
        debugger;
        var name1 = oEvent.getParameters().selectedItem;
        if (name1 === null) {
          this.getView()
            .byId("mcbState")
            .setValueState("Error")
            .clearSelection();
          this.getView().byId("mcbPin").setEnabled(false);
          var msg = "Kindly fill the mendatory field";
          MessageToast.show(msg);
        } else {
          this.getView().byId("mcbPin").setEnabled(true);
          this.getView().byId("mcbState").setValueState("None");
        }
      },
      onChange: function (oEvent) {
        debugger;

        var state = oEvent.getParameters().value;
        if (state === " ") {
          this.setMode("stop");
        } else {
          var name2 = oEvent.getParameters().itemPressed;

          if (name2 === false) {
            this.setMode("stop");
          } else {
            this.getView().byId("mcbState").setValueState("None");
          }
        }
      },

      onSelect2: function (oEvent) {
        this.getView().byId("mcbPlant").setEnabled(true);
      },
      onSelect3: function (oEvent) {
        this.setMode("run");
      },

      onPinCodeFinish: function (oEvent) {
        debugger;
        var pincode = oEvent.getParameters().selectedItems.length;
        if (pincode === 0) {
          this.setMode("stop");
          this.getView().byId("mcbPin").setEnabled(true);
          this.getView().byId("mcbPlant").setEnabled(false);
        } else {
          this.setMode("run");
          this.getView().byId("mcbPin").setEnabled(true);
        }
      },

      onProgress: function () {
        if (this.mode === "run") {
          this.getView().byId("idEmpTab").setVisible(true);
          this.getView().byId("btnSave").setEnabled(true).setVisible(true);
          this.getView().byId("btnCancel").setEnabled(true).setVisible(true);
        } else {
          var msg = "Kindly fill the mendatory field";
          MessageToast.show(msg);
          this.getView().byId("mcbState").setValueState("Error");
        }
      },

      setMode: function (sMode) {
        this.mode = sMode;
        if (this.mode === "stop") {
          this.getView()
            .byId("mcbPin")
            .setEnabled(false)
            .removeAllSelectedItems();
          this.getView()
            .byId("mcbPlant")
            .setEnabled(false)
            .removeAllSelectedItems();
          this.getView().byId("idEmpTab").setVisible(false);
          this.getView().byId("btnSave").setEnabled(false).setVisible(false);
          this.getView().byId("btnCancel").setEnabled(false).setVisible(false);
          this.getView().byId("mcbState").clearSelection();
        } else {
          this.getView().byId("mcbPlant").setEnabled(true);
        }
      },

      onChangeData: function () {
        //Step 1: Get the model object
        var oModel = this.oCore.getModel();

        //Step 2: call the standard function to change single/multiple data
        oModel.setProperty("/empStr/empName", "Ananya");
      },
      callMe: function () {
        //alert('welcome');

        //we can use the object of the button
        //First get the ui5 application object
        var oCore = sap.ui.getCore();

        //get the ui control object on which we can call ui5 functions
        var oBtn = oCore.byId("idSpiderman");

        //chaining is possible like below
        //sap.ui.getCore().byId("idSpiderman")

        //NEVER use the document API
        //var oBtn = document.getElementById("idSpiderman");

        //we can change the text using the setter function
        oBtn.setText("Change ho gaya!");
      },
      //Event handler function will get a FREE event object everytime
      onRowSelect: function (oAnubhav) {
        //Step 1: Address of the element which was selected
        var addressOfElement = oAnubhav.getParameter("rowContext").getPath();
        //Step 2: Get the object of Simple Form
        var oSimpleForm = this.getView().byId("idSimple");
        //Step 3: Bind this element to simple form so that we can take data from same memory
        oSimpleForm.bindElement(addressOfElement);

        //debugger;
        //alert('aaya kya ?');
      },
      //any function of our controller can access this global variable using this
      anu: 100,
      onInit: function () {
        //alert('my controller object is ready');
        this.anu = this.anu + 120;
        //alert("global variable value is " + this.anu);
        var oModel = Model.createJSONModel("models/mockdata/sample.json");

        var oModel2 = Model.createJSONModel("models/mockdata/sample2.json");

        var oXMLModel = Model.createXMLModel();
        //Step 3: Make the model aware to the application or view or control
        //this is our default model
        this.oCore.setModel(oModel);

        //at this line -- xml model will supersed the json model
        //this.oCore.setModel(oXMLModel);

        //this concept is called named model, to avoid overwriting of default model
        this.oCore.setModel(oModel2, "got");

        var oResource = Model.createResourceModel();
        this.oCore.setModel(oResource, "i18n");

        //this.getView().byId("idEmpTab").bindRows("/empTab");
        this.getView().byId("idEmpTab").bindAggregation("rows", "/empTab");

        //Syntax No. 3: for binding property
        //this.getView().byId("idSal").bindValue("/empStr/salary");
        //Syntax No. 4 : using generic method for binding value property
        //this.getView().byId("idCurr").bindProperty("value", "/empStr/currency");
      },
      onSwtChange: function () {
        //Get the model objects for both default and named
        var oModel = this.oCore.getModel();
        var oModel2 = this.oCore.getModel("got");

        //Flip them with each other to getCore
        this.oCore.setModel(oModel2);
        this.oCore.setModel(oModel, "got");
      },
      onBeforeRendering: function () {
        this.setMode("stop");
        // this.getView().byId("idEmpId").setValue("1001");
        // this.getView().byId("idEmpName").setValue("Anubhav");
        // this.getView().byId("idSal").setValue("10000");
        // this.getView().byId("idCurr").setValue("EUR");
        // this.getView().byId("idSmk").setSelected(false);
      },
      onAfterRendering: function () {
        $("#idXMLView--idSal").fadeOut(1000).fadeIn(5000);
      },
    });
  }
);
