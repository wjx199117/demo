<%--
@Project Name: vue-admin
@Author: w
@Date: 2017-11-17 16:03
@Idea: WebStorm
--%>

<template>
  <div class="line">
    <div class="line-list">
      <el-row style="margin-bottom: 16px;">
        <el-col :span="12" style="padding-left: 4px;">
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
      this.axios.get('getLineData')
      .then(data => {
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
            text: '未来一周气温变化',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            left: 0,
            data: ['最高气温', '最低气温']
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
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '最高气温',
              type: 'line',
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
            },
            {
              name: '最低气温',
              type: 'line',
              data: null,
              itemStyle: {
                normal: {
                  color: '#B6A2DE'
                }
              },
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
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
