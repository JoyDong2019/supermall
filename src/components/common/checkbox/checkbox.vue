<template>
    <div>
        <div class="checkbox" :class="{active:isChecked}">  
            
        </div>
       <div class="desc">
           <slot>
               </slot>
       </div>
    </div>
   
</template>
<script>
export default {
    name:'checkbox',
    props: {
        isChecked:{
            type:Boolean,
            default() {
                return false
            }
        }
    },
    data () {
        return {
           
        }
    },
    methods: {
       
    }

}
</script>
<style scoped>
.checkbox {
    float: left;
    margin-top: 6px;
    width: 20px;
    height: 20px;
    border: 1px solid #aaa;
    border-radius: 10px;
   
}
.checkbox img {
    text-align: center;
}
.active {
    border-color: cadetblue;
    background: url('~assets/img/cart/ticknew.jpg') no-repeat center;
    background-size: 20px;
    /* background-color: cadetblue; */
    
}
.desc {
    float: left;
    width: 30px;
    height: 20px;
    line-height: 20px;
    margin-left: 8px;
    margin-top: 8px;
}
</style>