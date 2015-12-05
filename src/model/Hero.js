
var Equip = function(id,lv){
  var id = id;
  var lv = lv;
  var data = datas.equips[id];

  this.getId = function(){
    return id;
  }
  this.getName = function(){
    return data.name;
  }
  this.getLife = function(){
    return data.life_base + data.life_grow * (lv-1);
  }
  this.getAttack = function(){
    return data.attack_base + data.attack_grow * (lv-1);
  }
  this.getHit = function(){
    return data.hit_base + data.hit_grow * (lv-1);
  }

}
var Skill = function(id,lv){
  var id = id;
  var lv = lv;
  var data = datas.skills[id];

  this.getId = function(){
    return id;
  }
  this.getName = function(){
    return data.name;
  }
  this.getLife = function(){
    return data.life_base + data.life_grow * (lv-1);
  }
  this.getAttack = function(){
    return data.attack_base + data.attack_grow * (lv-1);
  }
  this.getHit = function(){
    return data.hit_base + data.hit_grow * (lv-1);
  }
}
var Hero  = function(record){
  var id = record.id;
  var lv = record.lv;
  var star = record.star;
  var data = datas.heros[id];
  var equips = [];
  var skills = [];

  for(var i in record.equips){
    var equip = data.equips[i];
    var lv = record.equips[i];
    equips[i] = new Equip(equip,lv);
  }
  for(var i in record.skills){
    var skill = data.skills[i];
    var lv = record.skills[i];
    skills[i] = new Skill(skill,lv);
  }

  this.getId = function(){
    return id;
  }
  this.getFile = function(){
    return data.file;
  }
  this.getLv = function(){
    return lv;
  }
  this.getName = function(){
    return data.name;
  }
  this.getStar = function(){
    return star;
  }

  this.getEquipCount = function(){
    return equips.length;
  }
  this.getEquipData = function(i){
    return equips[i];
  }
  this.getSkillCount = function(){
    return skills.length;
  }
  this.getSkillData = function(i){
    return skills[i];
  }
  this.getLife = function(){
    var val = data.levelDatas[lv-1].life;
    for(var i in equips){
      val += equips[i].getLife();
    }
    return val;
  }
  this.getAttack = function(){
    var val = data.levelDatas[lv-1].attack;
    for(var i in equips){
      val += equips[i].getAttack();
    }
    return val;
  }
  this.getHit = function(){
    var val = data.levelDatas[lv-1].tap;
    for(var i in equips){
      val += equips[i].getHit();
    }
    return val;
  }
  this.getRecover = function(){
    var val = data.levelDatas[lv-1].recover;
    return val;
  }
  this.getCtrChance = function(){
    var val = data.ctr_chance;
    return val;
  }
  this.getCtrModify = function(){
    var val = data.ctr_modify;
    return val;
  }
  this.getAnimateDelay = function(){
    return data.animate;
  }
}
