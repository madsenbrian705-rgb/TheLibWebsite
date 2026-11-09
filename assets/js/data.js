/* =========================================================================
   THE LIBRARY — SITE CONTENT
   Edit this file to update hours, specials, events, menu and links.
   You never need to touch index.html or the CSS for day-to-day changes.
   ========================================================================= */

window.LIBRARY = {

  /* ---------- Basics ---------- */
  info: {
    name: "The Library Kitchen & Taphouse",
    address: "3725 W Michigan Ave",
    cityStateZip: "Kalamazoo, MI 49006",
    phone: "269.743.7103",
    phoneHref: "+12697437103",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Library+Kitchen+%26+Taphouse+3725+W+Michigan+Ave+Kalamazoo+MI",
    orderUrl: "https://www.toasttab.com/local/order/the-library-kitchen-taphouse-3725-west-michigan-avenue",
    // TODO: confirm this gift card link in your Toast dashboard
    giftCardUrl: "https://www.toasttab.com/the-library-kitchen-taphouse-3725-west-michigan-avenue/giftcards",
    facebook: "https://www.facebook.com/therealLibrary/",
    instagram: "https://www.instagram.com/the_reallibrary/",
    // Paste a Formspree (formspree.io) form ID here to make the job form deliver to your inbox
    jobsFormEndpoint: "https://formspree.io/f/YOUR_FORM_ID"
  },

  /* ---------- Hero slideshow ----------
     Photos rotate behind the headline, in this order.
     position = which part of the photo stays in view when it's cropped
     ("left-right top-bottom"). Lower the second number to show more of the top. */
  heroSlides: [
    { src: "assets/img/hero/01-crowd.jpg",      position: "60% 30%", alt: "A packed crowd at The Library cheering with their hands up" },
    { src: "assets/img/hero/02-patio.jpg",      position: "50% 62%", alt: "Friends on the patio at night under string lights" },
    { src: "assets/img/hero/03-dancing.jpg",    position: "72% 40%", alt: "Friends dancing together in warm light" },
    { src: "assets/img/hero/04-dj.jpg",         position: "50% 32%", alt: "A DJ at the turntables looking out over a full room" },
    { src: "assets/img/hero/05-wigs.jpg",       position: "50% 40%", alt: "A group of friends smiling in matching bright-colored wigs" },
    { src: "assets/img/hero/06-red-crowd.jpg",  position: "45% 60%", alt: "A busy crowd under red and purple lights" },
    { src: "assets/img/hero/07-neon.jpg",       position: "50% 61%", alt: "Neon lights and lasers over a packed dance floor" },
    { src: "assets/img/hero/08-face-paint.jpg", position: "60% 35%", alt: "Two friends in face paint on a costume night" }
  ],

  /* ---------- Scrolling gold band above the menu ---------- */
  tickerItems: ["Buster Burgers", "Hand-Tossed Pizza", "13 Wing Sauces", "Lake Perch Baskets", "Spicy Cheese Curds", "Pressed Sandwiches"],

  /* ---------- Hours ----------
     24-hour clock. close past midnight is fine (e.g. "02:00").
     Set a day to null if closed.
     TODO: confirm — these are placeholders.                         */
  hours: {
    mon: { open: "12:00", close: "02:00" },
    tue: { open: "12:00", close: "02:00" },
    wed: { open: "12:00", close: "02:00" },
    thu: { open: "12:00", close: "02:00" },
    fri: { open: "12:00", close: "02:00" },
    sat: { open: "12:00", close: "02:00" },
    sun: { open: "12:00", close: "02:00" }
  },
  // TODO: confirm — placeholder wording
  kitchenNote: "Kitchen open late. Carry-out available all day.",

  /* ---------- Weekly specials ----------
     theme  = the big name for the night
     deals  = bullet list
     TODO: confirm — deals are from older listings; the night names
     and "Games on every screen" are placeholder wording.            */
  specials: {
    mon: {
      theme: "Trivia Monday",
      deals: ["Trivia starts at 8 PM", "$4 craft pints", "$6 Buster Burger baskets"]
    },
    tue: {
      theme: "Taphouse Tuesday",
      deals: ["Happy Hour 4–8 PM", "Late-night drink specials 8 PM–12 AM"]
    },
    wed: {
      theme: "Hump Day",
      deals: ["Happy Hour 4–8 PM", "Late-night drink specials 8 PM–12 AM"]
    },
    thu: {
      theme: "Thirsty Thursday",
      deals: ["Happy Hour 4–8 PM", "Late-night drink specials 8 PM–12 AM"]
    },
    fri: {
      theme: "Friday Night",
      deals: ["Happy Hour 4–8 PM", "Late-night drink specials 8 PM–12 AM"]
    },
    sat: {
      theme: "Half Off Saturday",
      deals: ["Half off — the Saturday tradition", "Ask your bartender for the details"]
    },
    sun: {
      theme: "Sunday Funday",
      deals: ["$5 Bloody Marys", "$5 Mimosas", "Games on every screen"]
    }
  },
  // TODO: confirm — from an older listing; the Bronco ID detail is placeholder wording
  studentDeal: "Show your Bronco ID for half-off appetizers.",

  /* ---------- Events ----------
     recurring: shown automatically for the next few weeks.
       day = 0 Sun, 1 Mon ... 6 Sat
     oneOff: add dated events here, e.g.
       { date: "2026-11-21", time: "9 PM", title: "Homecoming After Party", blurb: "DJ all night." }   */
  events: {
    // TODO: confirm — trivia night and prizes, Sunday Funday name
    recurring: [
      { day: 1, time: "8 PM",  title: "Trivia Night", blurb: "Grab your study group and put that tuition to work. Prizes for the top teams." },
      { day: 6, time: "All day", title: "Half Off Saturday", blurb: "The Saturday tradition. Get here early, the lot fills up fast." },
      { day: 0, time: "Open",  title: "Sunday Funday", blurb: "$5 Bloodys & Mimosas with every game on." }
    ],
    oneOff: [
      // { date: "2026-11-21", time: "9 PM", title: "Homecoming After Party", blurb: "DJ all night." }
    ]
  },

  /* ---------- Menu ----------
     price can be a number or a string like "11 / 13 / 15"           */
  menu: [
    {
      id: "apps", name: "Apps",
      items: [
        { name: "Basket of Fries", price: 8, desc: "Make them loaded! Add cheese, tomato and bacon for $2." },
        { name: "Basket of Tots", price: 10, desc: "Make them loaded! Add cheese, tomato and bacon for $2." },
        { name: "Sweet Potato Fries", price: 12 },
        { name: "Onion Rings", price: 12 },
        { name: "Cheese Sticks", price: 12, desc: "With your choice of ranch or marinara." },
        { name: "Spicy Cheese Curds", price: 12, desc: "Deep-fried cheese bites served with ranch." },
        { name: "Southwest Egg Rolls", price: 12, desc: "Stuffed with chicken, black beans, corn, red peppers and cheese. Served with spicy ranch." },
        { name: "Pretzel Bites", price: 12, desc: "Bavarian pretzel bites served with queso." },
        { name: "Churro Bites", price: 10, desc: "Fried dough tossed in cinnamon sugar with caramel or fluff." },
        { name: "Dip Tray", price: "11 / 13 / 15", desc: "Fresh tortilla chips with Buffalo Chicken Dip, Salsa, Guacamole or Queso. Pick one, two or three." }
      ]
    },
    {
      id: "snacks", name: "Snacks",
      items: [
        { name: "OG Dilla", price: 12, desc: "Jalapeño cheddar wrap stuffed with chicken or beef and a mozzarella-cheddar mix. Sour cream and salsa on the side." },
        { name: "Spicy Ranch Dilla", price: 12, desc: "Jalapeño cheddar wrap with chicken tenders, mozzarella and spicy ranch. Side of 3-pepper sour cream." },
        { name: "Nachos", price: 15, desc: "Beef or chicken, mozzarella, cheddar, tomato, onion and green pepper. Sour cream and salsa on the side." },
        { name: "Wings", price: "10 / 16", desc: "Eight breaded, naked or boneless with ranch or bleu cheese. Boneless $10 · Bone-in $16." },
        { name: "Chicken Skewers", price: 11, desc: "Four grilled skewers: Blackened, Cajun or Jamaican Jerk." }
      ],
      note: "Wing sauces: Mild · Medium · Spicy Ranch · Spicy Garlic · Spicy BBQ · BBQ Ranch · Honey BBQ · BBQ · Honey Mustard · Library Sauce · 3 Pepper Hottest · 3 Pepper BBQ · Sweet Chili BBQ. Add black olive, jalapeño or banana pepper $0.50 · guac or queso $2."
    },
    {
      id: "pizza", name: "Pizza & Bread",
      items: [
        { name: "Hand Tossed Pizza", price: 15, desc: "Hand-tossed crust, mozzarella and one topping. Sauce: Marinara, BBQ, Buffalo or Ranch." },
        { name: "Bread Sticks", price: 12, desc: "Tossed in garlic butter and parmesan." },
        { name: "Italian Cheese Bread", price: 12, desc: "14\" hand-tossed crust with mozzarella, garlic and Italian seasoning." },
        { name: "Pepperoni Rolls", price: 13, desc: "Pepperoni and mozzarella hand-rolled into dough balls, garlic butter and parmesan." }
      ],
      note: "Toppings $1.50: bacon, chicken, ground beef, ham, pepperoni, sausage. $0.75: banana pepper, black olive, green pepper, jalapeño, mushroom, pickle, pineapple, tomato, onion. Flavored crust: garlic butter, garlic parmesan, Cajun, ranch, Cajun ranch."
    },
    {
      id: "burgers", name: "Burgers & Baskets",
      items: [
        { name: "Buster Burger", price: 16, featured: true, desc: "A set of TWO double Angus smash burgers. Any toppings you add go on both." },
        { name: "Chicken Finger Basket", price: 15, desc: "Four hand-battered tenders with your choice of dipping sauce." },
        { name: "Fried Perch Basket", price: 19, desc: "Four pieces of lightly battered lake perch, regular or spicy, with coleslaw, lemon and tartar." }
      ],
      note: "Cheese: American, Cheddar, Pepper Jack, Swiss. Toppings $0.50: banana pepper, black olive, green pepper, jalapeño, lettuce, mushroom, onion, pickle, pineapple, tomato. $1: bacon, sautéed mushroom, sautéed onion, olive blend, onion ring."
    },
    {
      id: "salads", name: "Salads & Wraps",
      items: [
        { name: "Library Salad", price: 12, desc: "Grilled or fried chicken, cheddar, tomato, onion and croutons on romaine." },
        { name: "Chicken Caesar Salad", price: 12, desc: "Blackened grilled chicken, shredded parmesan and croutons with Caesar." },
        { name: "Spicy Buffalo Salad", price: 12, desc: "Fried tenders tossed in buffalo, cheddar, tomato and tortilla strips with ranch." },
        { name: "Side Salad", price: 7, desc: "Romaine with tomato, cheddar and croutons." }
      ],
      note: "Upgrade any salad to a wrap for $2. Dressings: Ranch, Italian, Balsamic Vinaigrette, Bleu Cheese, Caesar, Honey Mustard, Library Sauce."
    },
    {
      id: "sandwiches", name: "Sandwiches",
      items: [
        { name: "Pressed Italian", price: 15, desc: "Turkey, ham, capicola, mozzarella, lettuce and tomato with mayo, oil and red wine vinegar on a pressed sub bun." },
        { name: "Pressed Club", price: 15, desc: "Ham, turkey, bacon, cheddar, mayo, lettuce and tomato on a pressed sub bun." },
        { name: "T.B.R. Pita", price: 12, desc: "Sliced turkey, lettuce, tomato, bacon and ranch in a warm pita." },
        { name: "Chicken Sandwich", price: 14, desc: "Grilled or fried chicken with lettuce, tomato and onion. Sub perch for $2." }
      ]
    },
    {
      id: "drinks", name: "Drinks",
      // TODO: confirm — this whole category is placeholder wording
      items: [
        { name: "Draft Beer", price: "", desc: "Rotating Michigan craft and domestic drafts. Ask your bartender what's tapped today." },
        { name: "Buckets", price: "", desc: "Domestic bottle buckets for the table." },
        { name: "Cocktails & Shots", price: "", desc: "Full bar. Bloodys, mimosas, mixed drinks and the house shots." }
      ],
      note: "21+ with valid ID. Please drink responsibly and get home safe."
    }
  ],
  menuDisclaimer: "Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness."
};
