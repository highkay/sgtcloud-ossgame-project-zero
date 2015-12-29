/**
 * Created by highkay on 2015/12/29.
 */
var TopPanel = cc.Node.extend({

    ctor: function () {
        this._super();

        // load ccui gui
        var layer = ccs.csLoader.createNode(res.title_layer_json);
        this.addChild(layer);

        var root = layer.getChildByName('root');
        var pane = root.getChildByName('box');
        this.playerDiamondText = pane.getChildByName('gold_text');
        this.playerRelicText = pane.getChildByName('relic_text');
        this.battleNumText = root.getChildByName('level_text');
        this.fightBossBtn = root.getChildByName('fight_btn');
        this.leaveBossBtn = root.getChildByName('live_btn');
        this.stageNumText_bg = root.getChildByName('levelText_bg');
        this.stage_icon = root.getChildByName('stage_icon');
        var stageListRoot = root.getChildByName('enemyList').getChildByName('root');
        this.prev_stage_icon = stageListRoot.getChildByName("enemy_icon1");
        this.prev_stage_arrow = stageListRoot.getChildByName("star1");
        this.current_stage_icon = stageListRoot.getChildByName("enemy_icon2");
        this.next_stage_icon = stageListRoot.getChildByName("enemy_icon3");
        this.prev_stage_num = stageListRoot.getChildByName("level_text1");
        this.current_stage_num = stageListRoot.getChildByName("level_text2");
        this.next_stage_num = stageListRoot.getChildByName("level_text3");
        this.state = TopPanel.STATE_NORMAL_BATTLE;

        var self = this;
        // register battle custom event
        customEventHelper.bindListener(EVENT.BATTLE_START, function (event) {
            self.refreshStageState(event.getUserData(), player.stage_battle_num, PlayerData.getStageData().getRandomBattleCount());
            self.refreshStageList();
        });

        bindButtonCallback(this.fightBossBtn, function () {
            customEventHelper.sendEvent(EVENT.FIGHT_BOSS_BATTLE);
        });
        bindButtonCallback(this.leaveBossBtn, function () {
            customEventHelper.sendEvent(EVENT.LEAVE_BOSS_BATTLE);
        });


        this.refreshPlayerDiamondText = function () {
            this.playerDiamondText.setString(player.gem);
        };
        this.refreshPlayerRelicText = function () {
            this.playerRelicText.setString(player.relic);
        };
        this.refreshStageState = function (bossBattle, cur, max) {

            // 根据当前stage的battle状态设置gui状态
            if (bossBattle) {
                this.state = BATTLE_STATE.STATE_BOSS_BATTLE;
            } else {
                if (cur > max) {
                    this.state = BATTLE_STATE.STATE_BOSS_READY;
                } else {
                    this.state = BATTLE_STATE.STATE_NORMAL_BATTLE;
                }
            }
            // 根据gui状态控制各个控件的可见性
            if (this.state === BATTLE_STATE.STATE_NORMAL_BATTLE) {
                this.battleNumText.setString(cur + '/' + max);
                this.leaveBossBtn.setVisible(false);
                this.fightBossBtn.setVisible(false);
                this.battleNumText.setVisible(true);
                this.stageNumText_bg.setVisible(true);
                this.stage_icon.setVisible(true);
            } else if (this.state === BATTLE_STATE.STATE_BOSS_BATTLE) {
                this.leaveBossBtn.setVisible(true);
                this.fightBossBtn.setVisible(false);
                this.battleNumText.setVisible(false);
                this.stageNumText_bg.setVisible(false);
                this.stage_icon.setVisible(false);
            } else if (this.state === BATTLE_STATE.STATE_BOSS_READY) {
                this.leaveBossBtn.setVisible(false);
                this.fightBossBtn.setVisible(true);
                this.battleNumText.setVisible(false);
                this.stageNumText_bg.setVisible(false);
                this.stage_icon.setVisible(false);
            }
        };
        this.refreshStageList = function () {
            var preStageId = PlayerData.getStageData().getPrevStageId();
            if (preStageId) {
                var preStage = new Stage(preStageId);
                this.loadStageIcon(preStage, this.prev_stage_icon);
                this.prev_stage_num.setString(preStage.getStageNum());
                this.prev_stage_arrow.setVisible(true);
            } else {
                this.prev_stage_arrow.setVisible(false);
            }
            this.loadStageIcon(PlayerData.getStageData(), this.current_stage_icon);
            this.current_stage_num.setString(PlayerData.getStageData().getStageNum());
            var nextStageId = PlayerData.getStageData().getNextStageId();
            if (nextStageId) {
                var nextStage = new Stage(nextStageId);
                this.loadStageIcon(nextStage, this.next_stage_icon);
                this.next_stage_num.setString(nextStage.getStageNum());
            }
        };
        this.loadStageIcon = function (stage, stageIconWidget) {
            var icon_image_url = "res/stages/" + stage.getIcon();
            stageIconWidget.loadTexture(icon_image_url, ccui.Widget.LOCAL_TEXTURE);
        };

        this.refreshAll = function () {
            var stage = PlayerData.getStageData();
            var cur = player.stage_battle_num;
            var max = stage.getRandomBattleCount();
            this.refreshPlayerDiamondText();
            this.refreshPlayerRelicText();
            this.refreshStageState();
            this.refreshStageList();
        };
    }
});
