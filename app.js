
//UI Controller
const UICtrl = (function() {

    //UI Object 
    const UISelectors = {

        itemList: '#item-list',
        itemLists: '#item-lists',
        listItems: '#item-list li',
        Lbdate: '#lbdate',
        Lbmeal: '#lbmeal',
        Lbcalorie: '#lbcalorie',
        Weeklygoal: '#wgoal',
        TxtDate: '#txtdate',
        TxtMeal: '#txtmeal',
        TxtCalorie: '#txtCalorie',
        BtnEnter: '#btnEnter',
        BtnAddMeal: '#btnAddMeal',
        BtnUpdate: '#btnUpdate',
        BtnDelete: '#btnDel',
        BtnBack: '#btnBack',
        TotalCal: '#totalCal',
        Goal: '#goal',
        Remain: '#remain',
        YourGoal: '.your-goal',
        Tcal: '.total-calories',
        Remaining: '.remaining',
        clearBtn: '#clearBtn',
        LBgo: '#lbgo',
        Header: '#header',
        updateHeader: '#headerUpdate'

    }

    //public method
    return {
        populateItemList: function(items){
            let html = '';
      
            items.forEach(function(item){
              html += `<li class="list-group-item" id="item-${item.id}">
              <strong>${item.name}: </strong> <em>${item.calories} Calories | </em> <strong class="float-center">${item.date}</strong>
              <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil float-right"></i>
              </a>
            </li>`;
            });
      
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
          },

            //Get form Input
          getItemInput: function(){
            return {
              date:document.querySelector(UISelectors.TxtDate).value,
              name:document.querySelector(UISelectors.TxtMeal).value,
              calories:document.querySelector(UISelectors.TxtCalorie).value
            }
          },
          
          //Clear Home Screen
        clearHomeState: function() {
           
            document.querySelector(UISelectors.Lbdate).style.display='none';
            document.querySelector(UISelectors.Lbcalorie).style.display='none';
            document.querySelector(UISelectors.Lbmeal).style.display='none';
            document.querySelector(UISelectors.TxtDate).style.display='none';
            document.querySelector(UISelectors.TxtMeal).style.display='none';
            document.querySelector(UISelectors.TxtCalorie).style.display='none';
            document.querySelector(UISelectors.BtnAddMeal).style.display='none';
            document.querySelector(UISelectors.BtnUpdate).style.display='none';
            document.querySelector(UISelectors.BtnDelete).style.display='none';
            document.querySelector(UISelectors.BtnBack).style.display='none';
            document.querySelector(UISelectors.Header).style.display='none';
            document.querySelector(UISelectors.updateHeader).style.display='none';
        },
         // Clear Input Form
        clearInput: function(){
            document.querySelector(UISelectors.TxtDate).value = '';
            document.querySelector(UISelectors.TxtMeal).value = '';
            document.querySelector(UISelectors.TxtCalorie).value = '';
          },

          // Add Item to Form
          addItemToForm: function(){
            document.querySelector(UISelectors.TxtDate).value = ItemCtrl.getCurrentItem().date;
            document.querySelector(UISelectors.TxtMeal).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.TxtCalorie).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
          },
          //Remove Item
          removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
      
            // Turn Node list into array
            listItems = Array.from(listItems);
      
            listItems.forEach(function(item){
              item.remove();
            });
          },

          //Hide lIst
          hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
          },

          //Clear Edit State
          clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.BtnUpdate).style.display = 'none';
            document.querySelector(UISelectors.BtnDelete).style.display = 'none';
            document.querySelector(UISelectors.BtnBack).style.display = 'none';
            document.querySelector(UISelectors.BtnAddMeal).style.display = 'inline';
            document.querySelector(UISelectors.updateHeader).style.display='none';
            document.querySelector(UISelectors.Header).style.display='inline';
          },

          //Clear Goal Setting State
          clearGoalSetting: function() {

            UICtrl.clearHomeState();
            document.querySelector(UISelectors.LBgo).style.display='inline';
            document.querySelector(UISelectors.Weeklygoal).style.display='inline';
            document.querySelector(UISelectors.Weeklygoal).value = '';
            document.querySelector(UISelectors.BtnEnter).style.display='inline';
           


          },

          //Show Edit State
          showEditState: function(){
            document.querySelector(UISelectors.BtnUpdate).style.display = 'inline';
            document.querySelector(UISelectors.BtnDelete).style.display = 'inline';
            document.querySelector(UISelectors.BtnBack).style.display = 'inline';
            document.querySelector(UISelectors.BtnAddMeal).style.display = 'none';
            document.querySelector(UISelectors.updateHeader).style.display='inline';
            document.querySelector(UISelectors.Header).style.display='none';
          },

          //Show UI object
        showAfterGoalSet: function() {

            document.querySelector(UISelectors.Lbdate).style.display='inline';
            document.querySelector(UISelectors.Lbcalorie).style.display='inline';
            document.querySelector(UISelectors.Lbmeal).style.display='inline';
            document.querySelector(UISelectors.TxtDate).style.display='inline';
            document.querySelector(UISelectors.TxtMeal).style.display='inline';
            document.querySelector(UISelectors.TxtCalorie).style.display='inline';
            document.querySelector(UISelectors.BtnAddMeal).style.display='inline';
            document.querySelector(UISelectors.BtnUpdate).style.display='none';
            document.querySelector(UISelectors.BtnDelete).style.display='none';
            document.querySelector(UISelectors.BtnBack).style.display='none';
            document.querySelector(UISelectors.Header).style.display='inline';
            document.querySelector(UISelectors.BtnEnter).style.display='none';
            document.querySelector(UISelectors.Weeklygoal).style.display='none';
            document.querySelector(UISelectors.LBgo).style.display='none';
            document.querySelector(UISelectors.updateHeader).style.display='none';

        },
        getSelectors: function() {
            return UISelectors;
        },
        getGoalInput: function() {
            return {
                goalCalorie: document.querySelector(UISelectors.Weeklygoal).value
            }
        },

        addgoalCalorie: function(goalItem) {
          
            document.querySelector(UISelectors.YourGoal).textContent = `${goalItem.goalCalorie}`;

        },
        addListItem: function(item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'list-group-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories | </em> <strong class="float-center">${item.date}</strong>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil float-right"></i>
            </a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: function(item){
          let listItems = document.querySelectorAll(UISelectors.listItems);
    
          // Turn Node list into array
          listItems = Array.from(listItems);
    
          listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
    
            if(itemID === `item-${item.id}`){
              document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories | </em> <strong class="float-center">${item.date}</strong>
              <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil float-right"></i>
              </a>`;
            }
          });
        },

        deleteListItem: function(id){
          const itemID = `#item-${id}`;
          const item = document.querySelector(itemID);
          item.remove();
        },
      
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.Tcal).textContent = totalCalories;
          },

        showGoalSet: function(item) {
            document.querySelector(UISelectors.YourGoal).textContent = item;
          },

        showRemainCalories: function(totalremain) {
         document.querySelector(UISelectors.Remaining).textContent = totalremain;
        

        },

        clearGoal: function() {
          document.querySelector(UISelectors.YourGoal).textContent = 0;
        },

        clearRemainCalories() {
          document.querySelector(UISelectors.Remaining).textContent = 0;
        }
    }
})();

//App Controller
const App = (function(StorageCtrl, ItemCtrl, UICtrl){
    // load event listener
    const loadEventListener = function() {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        //Add goal calorie event
        document.querySelector(UISelectors.BtnEnter).addEventListener('click', itemAddGoal);
        //Add item event 
        document.querySelector(UISelectors.BtnAddMeal).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
            e.preventDefault();
            return false;
            }
        });

          // Edit icon click event
       document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

         // Update item event
        document.querySelector(UISelectors.BtnUpdate).addEventListener('click', itemUpdateSubmit);

                // Delete item event
        document.querySelector(UISelectors.BtnDelete).addEventListener('click', itemDeleteSubmit);

          // Back button event
        document.querySelector(UISelectors.BtnBack).addEventListener('click', UICtrl.clearEditState);

          // Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
          
    }

    //Add Goal Calorie
    const itemAddGoal = function(e) {

        // get input from UI Selector
        const gInput = UICtrl.getGoalInput();
        
        if(gInput.goalCalorie !== '') {

            const newgoalCalorie = ItemCtrl.addGoalCalorie(gInput.goalCalorie);

            //Add item to UI
            UICtrl.addgoalCalorie(newgoalCalorie);
                     
            UICtrl.showAfterGoalSet();

        } else {
            
            document.querySelector('#alert').innerHTML= `
            <div class="alert alert-danger mt-3" role="alert">
            Set Your Calories Goal
            </div>
            
            ` ;
            setTimeout(() => {
                clearAlert();
            }, 5000);
            console.log('something is wromg');
        }

        e.preventDefault();

    }
    // item add Submit 
    const itemAddSubmit = function(e) {

        // get goal calories
        let fetchGoal = ItemCtrl.getGoalCalorie();
        // Get percentage
        let percet = ItemCtrl.getPercentage();
    
        //get input from UI
        const input = UICtrl.getItemInput();
        
      
         if(input.date !== '' && input.name !== '' &&  input.calories !== '') {

         const newItem = ItemCtrl.addItem(input.date, input.name, input.calories);
        
          //Add Item to UI 
         UICtrl.addListItem(newItem);
            // Get total calories
          const totalCalories = ItemCtrl.getTotalCalories();
          // Add total calories to UI
          UICtrl.showTotalCalories(totalCalories);
  
           // // Get total goal calorie
           const totalGoalCalories = ItemCtrl.getGoalCalorie();
           UICtrl.showGoalSet(totalGoalCalories);
  
          //get total remina
          const totalRemain = ItemCtrl.getTotalRemain();
            //Add remaining calories to UI
           UICtrl.showRemainCalories(totalRemain);
  
              //Store in localStorage
          StorageCtrl.storeItem(newItem);
  
           if(totalCalories < fetchGoal && totalRemain <= percet ) {
            
          
              document.querySelector('#alert').innerHTML= `
              <div class="alert alert-warning mt-3" role="alert">
             You Have Less Than 2% Left In Your Set Goal Calorie
              </div>
              
              ` ;
  
              setTimeout(() => {
                  clearAlert();
              }, 40000);
  
              document.getElementById('remain').style.color = 'red';
             
  
           } else if(totalCalories > fetchGoal && totalRemain < 0 && totalRemain <= percet) {
  
             
              document.querySelector('#alert').innerHTML= `
              <div class="alert alert-danger mt-3" role="alert">
               You Consuming More Calories Than Your Set Goal ${fetchGoal}
              </div>
              
              ` ;
              setTimeout(() => {
                  clearAlert();
              }, 40000);
  
              document.getElementById('remain').style.color = 'red';
              }  
             }
          UICtrl.clearInput();

        e.preventDefault();
    }

        // Click edit item
      const itemEditClick = function(e){

        if(e.target.classList.contains('edit-item')) {
          // Get list item id (item-0, item-1)
          const listId = e.target.parentNode.parentNode.id;

          // Break into an array
          const listIdArr = listId.split('-');

          // Get the actual id
          const id = parseInt(listIdArr[1]);

          // Get item
          const itemToEdit = ItemCtrl.getItemById(id);

          // Set current item
          ItemCtrl.setCurrentItem(itemToEdit);

          // Add item to form
          UICtrl.addItemToForm();
        }

        e.preventDefault();
      }

      // Update item submit
      const itemUpdateSubmit = function(e){
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.date, input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearInput();

        e.preventDefault();
      }

       // Delete button event
        const itemDeleteSubmit = function(e){

             //get input from UI
        const input = UICtrl.getItemInput();
        
        if(input.date !== '' && input.name !== '' &&  input.calories !== '') {
           
          
          // Get current item
          const currentItem = ItemCtrl.getCurrentItem();

          // Delete from data structure
          ItemCtrl.deleteItem(clientInformation);

          // Delete from UI
          UICtrl.deleteListItem(currentItem.id);

          // Get total calories
          const totalCalories = ItemCtrl.getTotalCalories();
          // Add total calories to UI
          UICtrl.showTotalCalories(totalCalories);

          // Delete from local storage
          StorageCtrl.deleteItemFromStorage(currentItem.id);
          
          UICtrl.clearEditState();
          
        } else {

          document.querySelector('#alert').innerHTML= `
          <div class="alert alert-danger mt-3" role="alert">
          No Meal Selected
          </div>
          
          ` ;
          setTimeout(() => {
              clearAlert();
          }, 5000);
          console.log('something is wromg');

          UICtrl.showEditState();
        }        

          e.preventDefault();
        }


        // Clear items event
        const clearAllItemsClick = function() {

          // Delete all items from data structure
          ItemCtrl.clearAllItems();

          // Get total calories
          const totalCalories = ItemCtrl.getTotalCalories();

          // Add total calories to UI
          UICtrl.showTotalCalories(totalCalories);

          // Add total calories reminaing to UI
          UICtrl.clearRemainCalories();

          UICtrl.clearGoal();

          // Remove from UI
          UICtrl.removeItems();

          // Clear from local storage
          StorageCtrl.clearItemsFromStorage();

          // Hide UL
          UICtrl.hideList();

          UICtrl.clearGoalSetting();

          document.getElementById('remain').style.color = 'black';
          
        }
  
    // clear alert msg 
     const clearAlert = function() {

        return document.querySelector('#alert').remove();
     }


    //public 
    return {

        init: function() {

          UICtrl.clearHomeState();

          ItemCtrl.getGoalCalorie();
           
         

          // Fetch items from data structure
            const items = ItemCtrl.getItems();
           
            if(items.length >= 1 ) {

                UICtrl.showAfterGoalSet();
                
               // Get total calories
                 const totalCalories = ItemCtrl.getTotalCalories();

                //  //Show total calories 
                  UICtrl.showTotalCalories(totalCalories);

                // // Get total goal calorie
                 const totalGoalCalories = ItemCtrl.getgoalarr();

                 UICtrl.showGoalSet(totalGoalCalories);

               // Get total remain calories
                 const totalRemain = ItemCtrl.getTotalRemain();
            
                // //Show total remian 
                  UICtrl.showRemainCalories(totalRemain);
           
               UICtrl.populateItemList(items);
        
            }
            else {
              
                UICtrl.clearHomeState();
            }
            
               loadEventListener();
        }

    }

})(StorageCtrl, ItemCtrl, UICtrl);



App.init();