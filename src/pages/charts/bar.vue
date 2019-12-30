<%--
@Project Name: vue-admin
@Author: w
@Date: 2017-11-17 11:37
@Idea: WebStorm
--%>

<template>
  <div class="bar">
    <div class="bar-list">
      <el-row style="margin-bottom: 16px;">
        <el-col :span="24" style="padding-bottom: 8px;">
          <el-card>
            <div slot="header">统计</div>
            <chart ref="B" :options="optionsB" style="width: 100%;"></chart>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      const chartB = this.$refs['B'];
      chartB.showLoading();
      this.axios.get('getBarData')
      .then(data => {
        console.log(data);
        if (data.errno === 0) {
          const options = data.data;
          chartB.mergeOptions({
            series: options.optionsB.series
          });
          setTimeout(() => {
            chartB.hideLoading();
          }, 1000);
        } else {
          chartB.hideLoading();
          console.log(data.msg);
        }
      })
      .catch(error => {
        chartB.hideLoading();
        console.log(error);
      });
    },
    data () {
      return {
        optionsB: {
          title: {
            show: false,
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            left: 0,
            data: ['蒸发量']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              data: ['1月', '2月', '3月', '4月', '5月', '6月']
            }
          ],
          yAxis: {},
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: null,
              itemStyle: {
                normal: {
                  color: '#2EC7C9'
                }
              },
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        }
      }
    }
  };
</script>
<style lang="scss" scoped>

</style>
