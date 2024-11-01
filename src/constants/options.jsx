export const SelectTravelList = [
    {
        id: 1,
        title: 'Just me',
        desc: 'A sole traveles in exploration',
        icon: '🛫',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tendem',
        icon: '🥂',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventure',
        icon: '🏡',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        icon: '⛵️',
        people: '5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: `Don't worry about cost`,
        icon: '💸'
    }
]
export const AI_PROMT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me "hotelOptions" list with "hotelName", "hotelAddress", "price", "hotelImageUrl", "geoCoordinates", "rating", "descriptions" and suggest "itinerary" with "plan" for each day with "placeName", "placeDetails", "placeImageUrl", "geoCoordinates", "ticketPricing", "rating", "timeTravel" for each of the location for {totalDays} days with "bestTime" to visit in a day (like morning, evening, afternoon, night etc.) in JSON format as given below: {"hotelOptions":[{"descriptions":"","geoCoordinates":"","hotelAddress":"","hotelImageUrl":"","hotelName":"","price":"","rating":""},{"descriptions":"","geoCoordinates":"","hotelAddress":"","hotelImageUrl":"","hotelName":"","price":"","rating":""},{"descriptions":"","geoCoordinates":"","hotelAddress":"","hotelImageUrl":"","hotelName":"","price":"","rating":""}],"itinerary":{["bestTime":"","day":"","plan":[{"geoCoordinates":"","placeDetails":"","placeImageUrl":"","placeName":"","rating":"","ticketPricing":"","timeTravel":""},{"geoCoordinates":"","placeDetails":"","placeImageUrl":"","placeName":"","rating":"","ticketPricing":"","timeTravel":""}]]}}'