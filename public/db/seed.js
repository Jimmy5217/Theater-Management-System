const dbConnection = require('../../config/mongoConnection');
const data = require('../../data');
const movies = data.movies;
const register = data.register;
const comments = data.comments;
const session = data.session;


async function main() {
    const db = await dbConnection();

    await movies.createMovie("The Shawshank Redemption","It tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the following two decades, he befriends a fellow prisoner, contraband smuggler Ellis 'Red' Redding (Morgan Freeman), and becomes instrumental in a money-laundering operation led by the prison warden Samuel Norton (Bob Gunton)","9.7","142 minutes","Plot, crime","Tim Robbins, Morgan Freeman,Bob Gunton, William Sadler, Clancy Brown,Gil Bellows,James Whitmore ","1994",45,"https://upload.wikimedia.org/wikipedia/zh/a/af/Shawshank_Redemption_ver2.jpg",1);
    await movies.createMovie("The Fast and the Furious","The Fast and the Furious follows Brian O'Conner (Walker), an undercover cop tasked with discovering the identities of a group of unknown automobile hijackers led by Dominic Toretto (Diesel)","8.5","106 minutes","Action, crime, thriller","Paul Walker,Vin Diesel,Jordana Brewster,Michelle Rodriguez","1998",47,"https://upload.wikimedia.org/wikipedia/en/5/54/Fast_and_the_furious_poster.jpg",2);
    await movies.createMovie("3 Idiots","The film follows the friendship of three students at an Indian engineering college and is a satire about the social pressures under an Indian education system.[6][7][8] The film is narrated through parallel dramas, one in the present and the other ten years in the past","9.5","170 minutes","Plot, comedy, adventure","Aamir Khan,R. Madhavan,Sharman Joshi, Kareena Kapoor,Boman Irani,Omi Vaidya","2000",43,"https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",3);
    await movies.createMovie("The Blind Side","The film follows Oher from his impoverished upbringing, through his years at Wingate Christian School (a fictional representation of Briarcrest Christian School in Memphis, Tennessee),[4] his adoption by Sean and Leigh Anne Tuohy, to his position as one of the most highly coveted prospects in college football, then finally becoming a first-round pick of the Ravens.","9.0","120 minutes","biography","Quinton Aaron,Sandra Bullock,Tim McGraw,Kathy Bates","1996",41,"https://upload.wikimedia.org/wikipedia/en/6/60/Blind_side_poster.jpg",4);
    await movies.createMovie("Avengers: Endgame","Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the direct sequel to Avengers: Infinity War (2018) and the 22nd film in the Marvel Cinematic Universe (MCU).","9.2","181 minutes","Action, science fiction","Robert Downey Jr,Chris Evans,Mark Ruffalo,Chris Hemsworth,Scarlett Johansson,Jeremy Renner","2000",39,"https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",5);
    await movies.createMovie("Saving Private Ryan","The film follows United States Army Rangers Captain John H. Miller (Tom Hanks) and his squad (Tom Sizemore, Edward Burns, Barry Pepper, Giovanni Ribisi, Vin Diesel, Adam Goldberg, and Jeremy Davies) as they search for a paratrooper, Private First Class James Francis Ryan (Matt Damon), the last surviving brother of a family of four, with his three other brothers having been killed in action.","9.2","169 minutes","Action, plot, war, history","Tom Hanks,Edward Burns,Matt Damon,Tom Sizemore","2001",43,"https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg",6);

    await register.register("James","LeBron","champion@stevens.edu","male","30","12","1984","4finalmvp","LBJ",true);
    await register.register("Duncan","Tim","futureisyou@stevnes.edu","female","25","4","1976","5champion","5champion",false,[
    	{movieName:'The Shawshank Redemption', sessionId:1, movieId:1, ticketCount:1},
    	{movieName:'Saving Private Ryan', sessionId:2, movieId:6, ticketCount:1}]);
    await register.register("Jackson","Michael","god@stevens.edu","male","29","8","1967","greatsinger","greatsinger",false,[
    	{movieName:"Avengers: Endgame", sessionId:2, movieId:5, ticketCount:1}]);
    await register.register("jack","chen","famousstar@google.com","female","1","3","1990","chenlong","chenlong",false,[
    	{movieName:"3 Idiots", sessionId:2, movieId:3, ticketCount:1},
    	{movieName:"The Fast and the Furious", sessionId:2, movieId:2, ticketCount:1}]);

    await comments.creatComment("4finalmvp","The Shawshank Redemption","It's very interesting, I like it","8.0");
    await comments.creatComment("5champion","The Shawshank Redemption","The plot is very rich, the actors perform very well","7.6");
    await comments.creatComment("chenlong","The Fast and the Furious","It's very interesting, I like it","8.7");
    await comments.creatComment("4finalmvp","Saving Private Ryan","It's very interesting, I like it","7.7");
    await comments.creatComment("greatsinger","Avengers: Endgame","It's very interesting, I like it","7.6");
    await comments.creatComment("chenlong","3 Idiots","It's very interesting, I like it","7.9");
    await comments.creatComment("5champion","Saving Private Ryan","The plot is very rich, the actors perform very well","7.7");
    await comments.creatComment("greatsinger","Avengers: Endgame","It's very interesting, I like it","8.1");

    await session.create(1,1,20,"12/18/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,1,29,"12/18/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,1,30,"12/18/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    
    await session.create(1,1,20,"12/19/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,1,29,"12/19/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,1,30,"12/19/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    
    await session.create(1,2,25,"12/18/2020","14:20","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,2,25,"12/19/2020","14:20","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    
    await session.create(1,3,20,"12/20/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,3,23,"12/20/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,3,38,"12/20/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    
    await session.create(1,3,21,"12/21/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,3,39,"12/21/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,3,38,"12/21/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");

    await session.create(1,4,21,"12/22/2020","14:20","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,4,39,"12/22/2020","17:30","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,4,38,"12/22/2020","19:40","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");

    await session.create(1,4,21,"12/23/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,4,39,"12/23/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,4,38,"12/23/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");

    await session.create(1,5,21,"12/24/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,5,26,"12/24/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,5,38,"12/24/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");

    await session.create(1,6,21,"12/25/2020","11:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,6,26,"12/25/2020","17:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");
    await session.create(1,6,38,"12/25/2020","20:00","[[1,1,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,1,0,1,0,0,0],[0,0,1,1,1,0,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,0,0,0,0,1,1]]");



    await db.serverConfig.close();
}

main();
