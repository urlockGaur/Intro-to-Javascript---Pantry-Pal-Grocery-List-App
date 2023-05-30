//DRF
// pPal = Pantry
$(function() {
    $('div#pPalListArea').on('click', function(e) {
        $('div.pantryPalList').slideToggle(400); // toggle duration of 400ms
      });
    
    //array to hold all items on grocery list/pantry pal list
   let pPalList = []
   

    // prepopulate grocery list/pantry pal list with 3 items per assignment requirements
    pPalList.push({name: '8 oz Pack of Raspberries', qty: '3', category: 'Produce' });
    pPalList.push({name: 'Brisket', qty: 1, category: 'Meat' });
    pPalList.push({name: 'Block of Sharp Cheddar Cheese', qty: 1, category: 'Dairy' });
    console.log(pPalList)

    pPalList.sort(function(a, b) { //sorting the pPal array - mod6lab2
        if(a.category < b.category) {
            return -1
        }
        if(a.category > b.category) {
            return 1
        }
        return 0
       
    });
    let lastCategory = null;
    pPalList.forEach(function(item) {
        if(item.category !== lastCategory) {
            $('div.pantryPalList').append(`<h2>${item.category}</h2>`);
            lastCategory = item.category;
        }
        $('div.pantryPalList').append(`<div class="item notFound"><h3>${item.name}</h3><p>Qty: ${item.qty}</p></div>`);
    });
    
   
    //event listener
    $('#groceryListForm').on('submit', function(e) {
        e.preventDefault() //prevents default functionality

        // grabbing values from form inputs
        let newGListItem = $('input#gListItem').val();
        let newGListItemQuantity = $('input#gListItemQuantity').val();
        let newGListItemCategory = $('#gListItemCategory').val();

        //creating new pPal list item, adding to array

        let newpPalListItem = {name: newGListItem, qty: newGListItemQuantity, category: newGListItemCategory};
        pPalList.push(newpPalListItem);

        //sorting the pPal array - mod6lab2
        pPalList.sort(function(a, b) {
            if(a.category < b.category) {
                return -1
            }
            if(a.category > b.category) {
                return 1
            }
            return 0
           
        });


        //tried using this, but needed to sort
        //$('div.pantryPalList').append(`<div class = "item notFound"><h3>${newGListItem}</h3><p>Qty: ${newGListItemQuantity}</p><p>Category: ${newGListItemCategory}</p></div>`)

       // clear the current list before appending sorted items. If i did not clear, my prepopulated items would duplicate
       //https://www.w3schools.com/jquery/html_empty.asp
       $('div.pantryPalList').empty();

       // append the sorted grocery list items to the list
     

       let lastCategory = null;
       pPalList.forEach(function(item) {
           if(item.category !== lastCategory) {
               $('div.pantryPalList').append(`<h2>${item.category}</h2>`);
               lastCategory = item.category;
           }
           $('div.pantryPalList').append(`<div class="item notFound"><h3>${item.name}</h3><p>Qty: ${item.qty}</p></div>`);
       });
        //resets the form
        this.reset();

    });

    //event listener for closest item when clicked
    $('div.pantryPalList').on('click', function(e) { 

        let $target = $(e.target)
        let $closest = $target.closest('.item')
        // if statement to cycle between item status - item either not found or found. Else allows user to mark something found as not found to handle user errors, etc
        if($closest.hasClass('notFound')) {
            $closest.removeClass('notFound')
            $closest.addClass('found')

            } else  {
            $closest.removeClass('found')
            $closest.addClass('notFound')
            }
        });
    
    //event listener to remove found items from pantry pal list
    $('#itemFound').on('click', function(e){
        $('.found').fadeOut({
            duration: 400,
            complete: function() {
                $(this).hide() 
            }
        })
    })

    //event listener to show found items from pantry pal list
    $('#itemFoundDisplay').on('click', function(e){
        $('.found').fadeIn({
            duration: 400,
            complete: function() {
                $(this).show()
            }
        })
    })
    //allows user to reset list/clear it out if needed
    $('#resetGListButton').on('click', function(e) {
        $('div.pantryPalList').empty();
        //clears array so we can add new list items
        pPalList = [];
      });
});