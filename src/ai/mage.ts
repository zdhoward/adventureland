import { greeting } from "TestModule";
import { BaseCharacter } from "lib/BaseCharacter";
import { Party } from "lib/Party";
import { check_potion_stock, spawn_party, logoff_party, check_health_and_mana, attack_closest } from "MyLib";

greeting("TypeScript");
map_key("1", "snippet", "parent.start_runner();");
map_key("2", "snippet", "parent.stop_runner();");
map_key("3", "snippet", 'load_code("' + character.ctype + '");');
map_key("4", "snippet", 'stop_character("TYPHOS");stop_character("ASHPHOLD");');
game_log("To reload your code, first press 2 to stop the current AI, and then press 3 to reload the code.");

var attack_mode=true;
var leader_mode=true;
var desired_party=['TYPHOS', 'ASHPHOLD'];
var party=get_active_characters();

spawn_party(character.name, desired_party);

//if (character.name == "ZECHS"){
//  if (party.hasOwnProperty("TYPHOS")){
//    stop_character("TYPHOS");
//  }
//  if (party.hasOwnProperty("ASHPHOLD")){
//    stop_character("ASHPHOLD");
//  }
//  if (!party.hasOwnProperty("TYPHOS")){
//    start_character("TYPHOS", 1)
//  }
//  if (!party.hasOwnProperty("ASHPHOLD")) {
//    start_character("ASHPHOLD", 2)
//  }
//}

//show_json(character);

setInterval(function(){

	loot();

	//check_health_and_mana(character);

	//if (character.moving) return;

  //check_potion_stock(character);

	//if(character.hp<400 || character.mp<300) use_hp_or_mp();
	// Uses potions only when the above conditions are met
	//loot();

	if(!attack_mode || character.moving) return;

	attack_closest(character);

},250);
