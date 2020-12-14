const dbConnection = require('../../config/mongoConnection');
const data = require('../../data');
const movies = data.movies;
const register = data.register;

async function main() {
    const db = await dbConnection();

    //await movies.createMovie("The Shawshank Redemption","It tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the following two decades, he befriends a fellow prisoner, contraband smuggler Ellis 'Red' Redding (Morgan Freeman), and becomes instrumental in a money-laundering operation led by the prison warden Samuel Norton (Bob Gunton)","9.7","142 minutes","Plot, crime","Tim Robbins, Morgan Freeman,Bob Gunton, William Sadler, Clancy Brown,Gil Bellows,James Whitmore ","1994","45","https://upload.wikimedia.org/wikipedia/zh/a/af/Shawshank_Redemption_ver2.jpg","1");
    //await movies.createMovie("The Fast and the Furious","The Fast and the Furious follows Brian O'Conner (Walker), an undercover cop tasked with discovering the identities of a group of unknown automobile hijackers led by Dominic Toretto (Diesel)","8.5","106 minutes","Action, crime, thriller","Paul Walker,Vin Diesel,Jordana Brewster,Michelle Rodriguez","1998","47","https://upload.wikimedia.org/wikipedia/en/5/54/Fast_and_the_furious_poster.jpg","2");
    //await movies.createMovie("3 Idiots","The film follows the friendship of three students at an Indian engineering college and is a satire about the social pressures under an Indian education system.[6][7][8] The film is narrated through parallel dramas, one in the present and the other ten years in the past","9.5","170 minutes","Plot, comedy, adventure","Aamir Khan,R. Madhavan,Sharman Joshi, Kareena Kapoor,Boman Irani,Omi Vaidya","2000","43","https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg","3");
    //await movies.createMovie("The Blind Side","The film follows Oher from his impoverished upbringing, through his years at Wingate Christian School (a fictional representation of Briarcrest Christian School in Memphis, Tennessee),[4] his adoption by Sean and Leigh Anne Tuohy, to his position as one of the most highly coveted prospects in college football, then finally becoming a first-round pick of the Ravens.","9.0","120 minutes","biography","Quinton Aaron,Sandra Bullock,Tim McGraw,Kathy Bates","1996","41","https://upload.wikimedia.org/wikipedia/en/6/60/Blind_side_poster.jpg","4");
    //await movies.createMovie("Avengers: Endgame","Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the direct sequel to Avengers: Infinity War (2018) and the 22nd film in the Marvel Cinematic Universe (MCU).","9.2","181 minutes","Action, science fiction","Robert Downey Jr,Chris Evans,Mark Ruffalo,Chris Hemsworth,Scarlett Johansson,Jeremy Renner","2000","39","https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg","5");
    //await movies.createMovie("Saving Private Ryan","The film follows United States Army Rangers Captain John H. Miller (Tom Hanks) and his squad (Tom Sizemore, Edward Burns, Barry Pepper, Giovanni Ribisi, Vin Diesel, Adam Goldberg, and Jeremy Davies) as they search for a paratrooper, Private First Class James Francis Ryan (Matt Damon), the last surviving brother of a family of four, with his three other brothers having been killed in action.","9.2","169 minutes","Action, plot, war, history","Tom Hanks,Edward Burns,Matt Damon,Tom Sizemore","2001","43","https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg","6");

    // await register.register("James","LeBron","champion@stevens.edu","male","30","12","1984","4finalmvp","LBJ","true");
    // await register.register("Duncan","Tim","futureisyou@stevnes.edu","female","25","4","1976","5champion","5champion","flase",["The Shawshank Redemption","The Fast and the Furious","3 Idiots"]);
    // await register.register("Jackson","Michael","god@stevens.edu","male","29","8","1967","greatsinger","greatsinger","false",["Saving Private Ryan","The Blind Side"]);
    // await register.register("jack","chen","famousstar@google.com","female","1","3","1990","chenlong","chenlong","false",["The Blind Side","Avengers: Endgame"]);

    
    await db.serverConfig.close();
}

main();
