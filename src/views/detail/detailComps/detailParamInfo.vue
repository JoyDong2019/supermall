<template>
    <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
        <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-size"> 
            <tr v-for="(tr,indey) in table" :key="indey">
                <td v-for="(td,indez) in tr" :key="indez">
                    {{td}}
                </td>
            </tr>
        </table>
        <table class="info-param">
            <tr v-for="(info,index) in paramInfo.infos" :key="index">
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="paramInfo.image.length!==0">
            <img :src="paramInfo.image" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name:'detailParamInfo',
    props: {
        paramInfo:{
            type:Object,
            default() {
                return {}
            }
        }
    }
}
</script>
<style scoped>
.info-size {
    font-size: 14px;
    line-height: 20px;
    padding: 10px;
}
.info-size tr {
    padding-top: 5px;
}
.info-size  td {
    padding: 0 10px;
}
.info-param {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    padding: 20px;
    font-size: 14px;
}

.info-param-key {
    display: inline-block;
    width: 60px;
}
</style>