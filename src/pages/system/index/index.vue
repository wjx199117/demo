<template>
  <div class="div-box">
    <!--form表单-->
    <el-form ref="form" :model="form" label-width="80px" class="div-form">
      <el-form-item prop="inputText">
        共选
        <el-input-number v-model="form.inputText" :min="1" :max="10" label="请输入选择题数量" class="inputText"></el-input-number>
        题
        <el-button type="primary" @click="selectQuestion" class="el_p">随机选题</el-button>
      </el-form-item>
      <!--form表单题目部分-->
      <div class="div-form-top">
        <el-form-item v-for="(v,index) in form.data" :prop="'data.'+ index +'.selected'">
          <h4>{{index+1}}. {{v.question}}({{v.selected}})</h4>
          <el-radio-group v-model="v.selected">
            <template v-for="(value,key) in v.select">
              <el-radio :label="key" class="myRedio">{{key}}. {{value}}</el-radio><br/>
            </template>
          </el-radio-group>
        </el-form-item>
      </div>
      <!--form表单 按钮-->
      <div class="div-form-bottom">
        <el-form-item>
          <el-button @click="myForm('form')">重置</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!--echarts-->
    <div class="div-echarts">
      <div>
        <chart ref="myScope" :options="myScope"></chart>
      </div>
    </div>
  </div>
</template>

<script>
  import {onGet} from '../../../api/api'

  export default {
    mounted () {
      onGet(this.axios,this.form,'');
      //饼图
      /*const myScope = this.$refs['myScope'];
      myScope.showLoading();
      this.axios.get('getBarData')
        .then(data => {
          console.log(data);
          if (data.errno === 0) {
            const options = data.data;
            myScope.mergeOptions({
              series: options.optionsB.series
            });
            setTimeout(() => {
              myScope.hideLoading();
            }, 1000);
          } else {
            myScope.hideLoading();
            console.log(data.msg);
          }
        })
        .catch(error => {
          myScope.hideLoading();
          console.log(error);
        });*/
    },
    data() {
      return {
        form: {
          "inputText": "5",
          "data": [
            {
              "selected": " ",
              "question": "房间里睡大觉",
              "select": {
                "A": "地方电视剧弗兰克的时间里福建省多了房间里睡大觉离开",
                "B": "发多少建安费电视剧发送到都是饭",
                "C": "饭第三方第三方第三方都是",
                "D": " 范德萨范德萨范德萨范德萨 反对萨"
              },
              "answer": "A"
            }
          ]
        },
        myScope: {
          title: {
            text: '本次得分情况',
            subtext: '准确率',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            data:['正确','错误']
          },
          /*graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              fontSize: 30,
              text:'50000',
              textAlign:'top',
              fontWeight: 'bold'
            },
          },*/
          series: [
            {
              name:'本次得分情况',
              type:'pie',
              radius: ['40%', '70%'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个半圆的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    var colorList = ['rgb(0,200,100)','rgb(220,220,220)'];
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data:[
                {value:0, name:'正确'},
                {value:1, name:'错误'}
              ]
            }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        let errorCount = 0;
        let correctCount = 0;
        let formData = this.form.data;
        for(let i=0;i<formData.length;i++){
          if(formData[i].selected == formData[i].answer){
            correctCount++;
          }else{
            errorCount++;
          }
        }
        this.$set(this.myScope.title,'subtext','准确率'+(correctCount/(formData.length)*100).toFixed(2)+'%');
        const myScope = this.$refs['myScope'];
        myScope.showLoading();
        const options = {
          "myScope": {
            "series": [
              {
                "data": [
                  {value:correctCount, name:'正确'},
                  {value:errorCount, name:'错误'}
                ]
              }
            ]
          }
        }
        setTimeout(() => {
          myScope.mergeOptions({
            series: options.myScope.series
          });
          myScope.hideLoading();
        }, 100);

      },
      myForm(selected){
        this.$refs[selected].resetFields();
      },
      selectQuestion(){
        let myForm = this.form;
        onGet(this.axios,myForm,this.form.inputText);
        this.form = myForm;
      }
    }
  }
</script>
<style scoped>
  .myRedio{
    height: 40px;
  }
  .inputText{
    width:170px;
  }
  .el_p{
    margin-left: 80px;
  }
  .div-box{
    height: 100%;
  }
  .div-form{
    float:left;
    width:58%;
    height: 100%;
  }
  .div-echarts{
    float:left;
    width:42%;
  }
  .div-echarts div{
    margin-top: 190px;
    margin-left: 50px;
  }
  /*顶部div*/
  .div-form-top{
    height: 85%;
    /*需要设置绝对定位,才能用left*/
    position: relative;
    overflow: auto;
    margin-bottom: 15px;
  }
  /*底部div*/
  .div-form-bottom{
    /*这里*/
    position: relative;
  }
</style>
