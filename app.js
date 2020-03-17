

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