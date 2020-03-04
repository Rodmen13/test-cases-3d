import { _decorator, Component, Node, SpriteFrame, SpriteComponent, LabelComponent, UIStaticBatchComponent, director } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("StaticUI")
@menu('UI/StaticUI')
export class StaticUI extends Component {
    @property(LabelComponent)
    tipLabel: LabelComponent = null;
    @property
    newSceneName = '';
    @property({
        type: [UIStaticBatchComponent]
    })
    uiStaticBatchCompList: UIStaticBatchComponent[] = [];

    start () {
        this.scheduleOnce(this.func, 1.5);

        const local = cc.sys.localStorage;
        const item = local.getItem('ui-static-level');
        if (item) {
            this.tipLabel.string = `第 ${parseInt(item)} 次切回`;
        } else {
            this.tipLabel.string = `第 0 次切回`;
        }

        for (let i = 0; i < this.uiStaticBatchCompList.length; i++) {
            const element = this.uiStaticBatchCompList[i];
            element.markAsDirty();
        }
    }

    func() {
        const local = cc.sys.localStorage;
        const item = local.getItem('ui-static-level');
        if (item) {
            let level = parseInt(item);
            if (level > 5) {
                local.removeItem('ui-static-level');
                return;
            }

            level++;
            if (this.newSceneName === 'static-ui') {
                local.setItem('ui-static-level', `${level}`);
            }

        } else if (this.newSceneName === 'static-ui'){
            local.setItem('ui-static-level', '1');
        }

        director.loadScene(this.newSceneName);
    }
}
