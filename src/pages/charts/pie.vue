<%--
@Project Name: vue-admin
@Author: w
@Date: 2017-11-16 12:29
@Idea: WebStorm
--%>

<template>
  <div class="pie">
    <div class="pie-list">
      <el-row style="margin-bottom: 16px;">
        <el-col :span="24" style="padding-bottom: 8px;">
          <el-card>
            <div slot="header">网站访客来源分析</div>
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
      this.axios.get('getPieData')
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
            text: '网站访客来源分析'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            top: 40,
            data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: false,
          series: [
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, 70],

              // for funnel
              x: '20%',
              width: '40%',
              funnelAlign: 'right',
              max: 1548,

              itemStyle: {
                normal: {
                  label: {
                    position: 'inner'
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              data: [
                {
                  value: null,
                  name: '直达',
                  itemStyle: {
                    normal: {
                      color: '#2EC7C9'
                    }
                  }
                },
                {
                  value: null,
                  name: '营销广告',
                  itemStyle: {
                    normal: {
                      color: '#B6A2DE'
                    }
                  }
                },
                {
                  value: null,
                  name: '搜索引擎',
                  selected: true,
                  itemStyle: {
                    normal: {
                      color: '#5AB1EF'
                    }
                  }
                }
              ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: [100, 140],

              // for funnel
              x: '60%',
              width: '35%',
              funnelAlign: 'left',
              max: 1048,

              data: [
                {
                  value: null,
                  name: '直达',
                  itemStyle: {
                    normal: {
                      color: '#2EC7C9'
                    }
                  }
                },
                {
                  value: null,
                  name: '邮件营销',
                  itemStyle: {
                    normal: {
                      color: '#FFB980'
                    }
                  }
                },
                {
                  value: null,
                  name: '联盟广告',
                  itemStyle: {
                    normal: {
                      color: '#D87A80'
                    }
                  }
                },
                {
                  value: null,
                  name: '视频广告',
                  itemStyle: {
                    normal: {
                      color: '#8D98B3'
                    }
                  }
                },
                {
                  value: null,
                  name: '百度',
                  itemStyle: {
                    normal: {
                      color: '#E5CF0D'
                    }
                  }
                },
                {
                  value: null,
                  name: '谷歌',
                  itemStyle: {
                    normal: {
                      color: '#97B552'
                    }
                  }
                },
                {
                  value: null,
                  name: '必应',
                  itemStyle: {
                    normal: {
                      color: '#95706D'
                    }
                  }
                },
                {
                  value: null,
                  name: '其他',
                  itemStyle: {
                    normal: {
                      color: '#DC69AA'
                    }
                  }
                }
              ]
            }
          ]
        }
      };
    }
  };
</script>
<style lang="scss" scoped>

</style>
