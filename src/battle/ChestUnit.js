/**
 * Created by highkay on 2015/12/29.
 */

var ChestUnit = cc.Node.extend({
    ctor: function (position) {
        this._super();
        var json = ccs.load(res.chest03_json);
        this.node = json.node;
        this.animation = json.action;
        this.animationState = 'close';
        var chest = this.node.getChildByName("chest03");
        {
            //去除CCS导出文件位移会自带缓动效果的问题
            var timelines = this.animation.getTimelines();
            removeCCSAnimationDefaultTween(timelines);
        }
        this.node.runAction(this.animation);
        this.setPosition(position);
        this.initChest();
        var self = this;
        this.bindClickFairyEvent = function () {
            var listener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                onMouseDown: function (touch, event) {
                    //self.FairyUnit.convert
                    if(self.animationState == 'close'){
                        var touchPosition = chest.convertToNodeSpace(touch.getLocation());
                        var s = chest.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, touchPosition)) {
                            cc.log("获取金币");
                            self.stopAllActions();
                            self.playAnimation('open',false);
                            self.onOpenChest();
                        }
                        return true;
                    }
                    return false;

                },
            });
            cc.eventManager.addListener(listener, this);
        };
        this.bindClickFairyEvent();
        this.addChild(this.node);
    },
    playAnimation: function (name, falg) {
        this.animation.play(name, falg);
    },
    initChest: function(){
        var jumpPos = cc.p(Math.random() * 108 - 54, Math.random() * 36 - 16);
        this.appear = cc.jumpBy(0.2, jumpPos, 24, 1);
        var dropMove = cc.jumpTo(2, cc.p(280,250), 0, 3);
        var delay = cc.delayTime(5);

        var removeNode = cc.callFunc(function () {
            //打开
            this.playAnimation("open",false);
            this.onOpenChest();
            //this.removeFromParent(true);
        }, this);
        this.runAction(cc.sequence(this.appear,cc.delayTime(1),/*dropMove,*/ delay, removeNode));
    },
    generateLoot: function () {
        var pos = cc.p(this.getPositionX() + this.getParent().getPositionX(), this.getPositionY() + this.getParent().getPositionY());
        var rank = PlayerData.getStageData().getOfflineRewardByUnit("gold");
        rank.value = rank.value * 5;
        Loot.generateLoots(rank, pos);
    },
    onOpenChest: function(){
        this.animationState = 'open';
        var a = cc.delayTime(0.5);
        var b = cc.fadeTo(0.5, 0);
        this.node.runAction(cc.sequence(a,b, cc.callFunc(function () {
            this.removeFromParent(true);
        }, this)));
        var random = getRandomInt(0,10);//Math.floor(Math.random()*10);
        if(random == 0){
            //45s内金币掉落2倍；
        }else if(random == 1){
            //秒伤15s内2倍伤害；
        }else if(random == 2){
            //30s内点击怪物掉落怪物金币的20%
        }else{
            //金子
            this.generateLoot();
        }
        this.parent.reset();
    }

});