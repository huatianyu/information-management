import { Component, Vue, Inject } from 'vue-property-decorator';
import appconst from './appconst'
export default class AbpBase extends Vue {
    L(value: string, source?: string, ...argus: string[]): string {
        if (source) {
            console.log(window.abp.localization.localize(value, appconst.localization.defaultLocalizationSourceName, argus));

            return window.abp.localization.localize(value, source, argus);
        } else {
            console.log(window.abp.localization.localize(value, appconst.localization.defaultLocalizationSourceName, argus));
            return window.abp.localization.localize(value, appconst.localization.defaultLocalizationSourceName, argus);
        }

    }
    hasPermission(permissionName: string) {
        return window.abp.auth.hasPermission(permissionName);
    }
    hasAnyOfPermissions(...argus: string[]) {
        return window.abp.auth.hasAnyOfPermissions(...argus);
    }
    hasAllOfPermissions(...argus: string[]) {
        return window.abp.auth.hasAllOfPermissions(...argus);
    }

    goback(status) {
        if (status) {
            this.$Modal.confirm({
                title: "提示信息",
                content: "<p>操作尚未保存，是否继续</p>",
                onOk: () => {
                    this.$router.go(-1); //返回上一层
                },
                onCancel: () => { }
            });
        } else {
            this.$router.go(-1); //返回上一层
        }
    }
}