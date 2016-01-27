/**
 * Created by Administrator on 2016/1/21.
 */

//var BuffTip = cc.Node.extend({
//    ctor: function () {
//        this._super();
//        var buffTip = ccs.csLoader.createNode(res.buff_tip_json);
//        buffTip.setVisible(true);
//        this.width = buffTip.width;
//        this.height = buffTip.height;
//        this.addChild(buffTip);
//    }
//});
var BuffView=cc.Node.extend({
    ctor:function(res){
        this._super();
        var buff = ccs.csLoader.createNode(res);
        buff.setVisible(true);
        this.width = buff.width;
        this.height = buff.height;
        this.addChild(buff);
    }
});

var BuffLayer=cc.Class.extend({
    ctor:function(){
        //this._super();
        var buffLayer=ccs.csLoader.createNode(res.buff_layer_json);
        this.root=buffLayer.getChildByName('root').clone();
        this.icon=this.root.getChildByName('icon');
        this.text=this.root.getChildByName('text');
        this.time=this.root.getChildByName('time');
        this.width=buffLayer.width;
        this.height=buffLayer.height;
        this.text.setFontName("微软雅黑");
        this.time.setFontName("微软雅黑");
        this.time.setColor(cc.color(255,0,0));
        this.text.setFontSize(9);
        //this.time.setFontSize(10);
        //this.layer=this.root;
        //this.addChild(buffLayer);
    },
    setPosition:function(x,y){
      this.root.setPosition(x,y);
    },
    setPositionY:function(y){
      this.root.setPositionY(y);
    },
    getPositionY:function(){
      return this.root.getPositionY();
    },
    setIcon:function(path){
        this.icon.loadTexture('res/icon/skills/'+path)
    },
    setText:function(text){
        this.text.setString(text);
    },
    setTime:function(time){
        this.time.setString(time);
    }
});