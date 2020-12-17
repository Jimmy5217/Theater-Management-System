(function ($) {
    $(function(){
        const container = document.querySelector(".container");
        const seats = document.querySelectorAll(".row .seat:not(.occupied)");
        const count = document.querySelector("#count");
        const total = document.querySelector("#total");
        const ticketPrice = + document.querySelector("#price").innerText;
        const movieName = document.querySelector('#moviename').innerText;
    
        populateUI();
    

    
        // Update total and count
        function updateSelectedCount() {
            //the element list of the selected seat 
            const selectedSeats = document.querySelectorAll(".row .seat.selected");
            //an array of the selected seat index in the available seat table
            const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
        
            sessionStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
        
            const selectedSeatsCount = selectedSeats.length;
        
            count.innerText = selectedSeatsCount;
            total.innerText = selectedSeatsCount * ticketPrice;
        }
    
        // get data from session storage and populate selected seat ui
        function populateUI() {
            const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));
        
            if (selectedSeats !== null && selectedSeats.length > 0) {
                seats.forEach((seat, index) => {
                    if (selectedSeats.indexOf(index) > -1) {
                        seat.classList.add("selected");
                    }
                });
            }
            //seat click event
            container.addEventListener("click", e => {
                if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
                    e.target.classList.toggle("selected");
                    updateSelectedCount();
                }
            });
        
            // initial count and total
            updateSelectedCount();  
        }

        $('#order').on("click", function() {
            //the selected seats [[row,col],[row,col],...]
            const updateSeatIndex = []; 
            const sessionId = document.querySelector('#sessionIdHide').innerText;
            $('.selected').each(function() {
                // console.log($(this));
                var rowIndex = $(this).parent()[0].firstElementChild.innerText;
                if ($(this).children().length !== 0) {
                    var colIndex =  $(this).children()[0].innerText; 
                }
                if(rowIndex !== "" && colIndex !== undefined) {
                    updateSeatIndex.push([parseInt(rowIndex),parseInt(colIndex)]);
                }
            })

            $.ajax({
                type: 'POST',
                url: window.location.pathname + '/book',
                data: {
                    bookSeat: updateSeatIndex,
                    sessionId: sessionId,
                    ticketCount: count.innerText,
                    movieName: movieName
                }
            }).done( function() {
                window.location.href = '/profile';
                sessionStorage.clear();
            })

        })
    })

})(window.jQuery);

