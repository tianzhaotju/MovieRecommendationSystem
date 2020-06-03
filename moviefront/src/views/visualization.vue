<template>
  <div class="Echarts">
    <div id="type" style="width: 1100px;height:400px;"></div>
    <div id="language" style="width: 1100px;height:400px;"></div>
    <div id="district" style="width: 1100px;height:400px;"></div>
    <div id="year" style="width: 1100px;height:400px;"></div>
    <div id="length" style="width: 1100px;height:400px;"></div>
    <div id="basic" style="width: 1100px;height:400px;"></div>
  </div>
</template>

<script>
import world from 'echarts/map/json/world.json'
export default {
  name: 'Echarts',
  methods:{
    myTypes(){
		  // 基于准备好的dom，初始化echarts实例
		  var myType = this.$echarts.init(document.getElementById('type'));
		  // 指定图表的配置项和数据
		  var option = {
                title: {
                    text: '电影类型统计',
                    subtext: '',
                    x: 'center',
                    padding: [20, 10, 10, 10]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}部 ({d}%)"
                },
                calculable: true,
                series: [{
                    name: '电影类型统计',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '55%'],
                    data: [{
                        name: '剧情',
                        value: 2376
                    }, {
                        name: '喜剧',
                        value: 1245
                    }, {
                        name: '惊悚',
                        value: 1112
                    }, {
                        name: '爱情',
                        value: 1025
                    }, {
                        name: '动作',
                        value: 1018
                    }, {
                        name: '悬疑',
                        value: 693
                    }, {
                        name: '犯罪',
                        value: 643
                    }, {
                        name: '恐怖',
                        value: 609
                    }, {
                        name: '科幻',
                        value: 553
                    }, {
                        name: '冒险',
                        value: 506
                    }, {
                        name: '奇幻',
                        value: 419
                    }, {
                        name: '家庭',
                        value: 266
                    }, {
                        name: '动画',
                        value: 227
                    }, {
                        name: '战争',
                        value: 148
                    }, {
                        name: '历史',
                        value: 132
                    }, {
                        name: '其他',
                        value: 681
                    }]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myType.setOption(option);
		  },
    myLanguages(){
		  // 基于准备好的dom，初始化echarts实例
		  var myLanguage = this.$echarts.init(document.getElementById('language'));
		  // 指定图表的配置项和数据
		  var option = option = {
                title: {
                    text: '电影语言统计',
                    subtext: '',
                    x: 'center',
                    padding: [20, 10, 10, 10]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}部 ({d}%)"
                },
                calculable: true,
                series: [{
                    name: '电影语言统计',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '55%'],
                    data: [{
                        name: '英语',
                        value: 2386
                    }, {
                        name: '日语',
                        value: 732
                    }, {
                        name: '汉语普通话',
                        value: 647
                    }, {
                        name: '韩语',
                        value: 532
                    }, {
                        name: '粤语',
                        value: 481
                    }, {
                        name: '法语',
                        value: 339
                    }, {
                        name: '西班牙语',
                        value: 183
                    }, {
                        name: '德语',
                        value: 182
                    }, {
                        name: '意大利语',
                        value: 142
                    }, {
                        name: '俄语',
                        value: 125
                    }, {
                        name: '泰语',
                        value: 70
                    }, {
                        name: '拉丁语',
                        value: 36
                    }, {
                        name: '葡萄牙语',
                        value: 33
                    }, {
                        name: '阿拉伯语',
                        value: 31
                    }, {
                        name: '瑞典语',
                        value: 28
                    }, {
                        name: '其他',
                        value: 629
                    }]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myLanguage.setOption(option);
		  },
    myDistricts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myDistrict = this.$echarts.init(document.getElementById('district'));
		  this.$echarts.registerMap('world',world);
		  // 指定图表的配置项和数据
		  var option = {
                title: {
                    text: '不同国家电影产量统计',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return params.seriesName + '<br/>' + params.name + ' : ' + params.value;
                    }
                },
                dataRange: {
                    min: 0,
                    max: 2000,
                    text: ['', ''],
                    realtime: false,
                    calculable: true,
                    color: ['red', 'orangered', 'yellow', 'lightgreen', 'lightskyblue']
                },
                series: [{
                    name: '电影产量',
                    type: 'map',
                    mapType: 'world',
                    hoverable: false,
                    mapLocation: {
                        y: 50
                    },
                    data: [{
                        name: 'United States',
                        value: 1891
                    }, {
                        name: 'China',
                        value: 1162
                    }, {
                        name: 'Japan',
                        value: 668
                    }, {
                        name: 'Korea',
                        value: 527
                    }, {
                        name: 'United Kingdom',
                        value: 440
                    }, {
                        name: 'France',
                        value: 348
                    }, {
                        name: 'Germany',
                        value: 248
                    }, {
                        name: 'Canada',
                        value: 141
                    }, {
                        name: 'Italy',
                        value: 101
                    }, {
                        name: 'Australia',
                        value: 70
                    }, {
                        name: 'Spain',
                        value: 68
                    }, {
                        name: 'Thailand',
                        value: 56
                    }, {
                        name: 'Russia',
                        value: 39
                    }, {
                        name: 'Belgium',
                        value: 33
                    }, {
                        name: 'Sweden',
                        value: 30
                    }, {
                        name: 'Ireland',
                        value: 28
                    }, {
                        name: 'Czech Republic',
                        value: 27
                    }, {
                        name: 'Denmark',
                        value: 27
                    }, {
                        name: 'India',
                        value: 26
                    }, {
                        name: 'Poland',
                        value: 24
                    }, {
                        name: 'Switzerland',
                        value: 20
                    }, {
                        name: 'New Zealand',
                        value: 20
                    }, {
                        name: 'Austria',
                        value: 19
                    }, {
                        name: 'Norway',
                        value: 16
                    }, {
                        name: 'Netherlands',
                        value: 15
                    }, {
                        name: 'Brazil',
                        value: 13
                    }, {
                        name: 'Hungary',
                        value: 13
                    }, {
                        name: 'Slovakia',
                        value: 13
                    }, {
                        name: 'Mexico',
                        value: 13
                    }, {
                        name: 'Iran',
                        value: 12
                    }, {
                        name: 'South Africa',
                        value: 12
                    }, {
                        name: 'Finland',
                        value: 10
                    }, {
                        name: 'Turkey',
                        value: 8
                    }, {
                        name: 'Romania',
                        value: 8
                    }, {
                        name: 'Luxembourg',
                        value: 7
                    }, {
                        name: 'Argentina',
                        value: 7
                    }, {
                        name: 'Iceland',
                        value: 7
                    }, {
                        name: 'Indonesia',
                        value: 4
                    }, {
                        name: 'Israel',
                        value: 4
                    }, {
                        name: 'United Arab Emirates',
                        value: 4
                    }, {
                        name: 'Malaysia',
                        value: 4
                    }, {
                        name: 'Georgia',
                        value: 3
                    }, {
                        name: 'Cuba',
                        value: 3
                    }, {
                        name: 'Kazakhstan',
                        value: 3
                    }, {
                        name: 'Estonia',
                        value: 3
                    }, {
                        name: 'Vietnam',
                        value: 3
                    }, {
                        name: 'Greece',
                        value: 3
                    }, {
                        name: 'Lithuania',
                        value: 2
                    }, {
                        name: 'Chile',
                        value: 2
                    }, {
                        name: 'Ukraine',
                        value: 2
                    }, {
                        name: 'Portugal',
                        value: 2
                    }, {
                        name: 'Bulgaria',
                        value: 2
                    }, {
                        name: 'Botswana',
                        value: 2
                    }, {
                        name: 'The Bahamas',
                        value: 1
                    }, {
                        name: 'Uzbekistan',
                        value: 1
                    }, {
                        name: 'Algeria',
                        value: 1
                    }, {
                        name: 'Puerto Rico',
                        value: 1
                    }, {
                        name: 'Philippines',
                        value: 1
                    }, {
                        name: 'Mauritania',
                        value: 1
                    }, {
                        name: 'Morocco',
                        value: 1
                    }, {
                        name: 'Latvia',
                        value: 1
                    }, {
                        name: 'Egypt',
                        value: 1
                    }, {
                        name: 'Myanmar',
                        value: 1
                    }, {
                        name: 'Tunisia',
                        value: 1
                    }, {
                        name: 'Peru',
                        value: 1
                    }, {
                        name: 'Colombia',
                        value: 1
                    }, {
                        name: 'Tajikistan',
                        value: 1
                    }]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myDistrict.setOption(option);
		  },
    myYears(){
		  // 基于准备好的dom，初始化echarts实例
		  var myYear = this.$echarts.init(document.getElementById('year'));
		  // 指定图表的配置项和数据
		  var option = {
                title: {
                    text: '历年电影产量统计',
                    x: 'center',
                    padding: [15, 10, 10, 10]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return params.seriesName + '<br>' + params.value[0] + '年：' + params.value[1] + '部';
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'value',
                    min: 1915,
                    max: 2020,
                }],
                yAxis: [{
                    type: 'value',
                }],
                series: [{
                    name: '历年电影产量',
                    type: 'line',
                    symbol: 'none',
                    data: [
                        [1920, 1],
                        [1921, 1],
                        [1922, 3],
                        [1923, 2],
                        [1924, 3],
                        [1925, 2],
                        [1926, 2],
                        [1927, 1],
                        [1928, 2],
                        [1929, 1],
                        [1931, 2],
                        [1932, 5],
                        [1933, 2],
                        [1934, 3],
                        [1935, 3],
                        [1936, 2],
                        [1937, 1],
                        [1938, 3],
                        [1939, 1],
                        [1940, 3],
                        [1941, 4],
                        [1942, 3],
                        [1943, 5],
                        [1944, 3],
                        [1945, 4],
                        [1946, 4],
                        [1947, 2],
                        [1948, 6],
                        [1949, 5],
                        [1950, 3],
                        [1951, 6],
                        [1952, 8],
                        [1953, 10],
                        [1954, 6],
                        [1955, 10],
                        [1956, 6],
                        [1957, 8],
                        [1958, 10],
                        [1959, 14],
                        [1960, 9],
                        [1961, 9],
                        [1962, 15],
                        [1963, 8],
                        [1964, 13],
                        [1965, 8],
                        [1966, 12],
                        [1967, 9],
                        [1968, 12],
                        [1969, 11],
                        [1970, 10],
                        [1971, 9],
                        [1972, 9],
                        [1973, 17],
                        [1974, 16],
                        [1975, 13],
                        [1976, 12],
                        [1977, 12],
                        [1978, 12],
                        [1979, 14],
                        [1980, 16],
                        [1981, 17],
                        [1982, 15],
                        [1983, 12],
                        [1984, 24],
                        [1985, 24],
                        [1986, 17],
                        [1987, 27],
                        [1988, 33],
                        [1989, 32],
                        [1990, 37],
                        [1991, 43],
                        [1992, 44],
                        [1993, 53],
                        [1994, 61],
                        [1995, 68],
                        [1996, 50],
                        [1997, 80],
                        [1998, 70],
                        [1999, 92],
                        [2000, 75],
                        [2001, 101],
                        [2002, 111],
                        [2003, 123],
                        [2004, 159],
                        [2005, 172],
                        [2006, 176],
                        [2007, 222],
                        [2008, 193],
                        [2009, 229],
                        [2010, 224],
                        [2011, 255],
                        [2012, 268],
                        [2013, 292],
                        [2014, 499],
                        [2015, 258]
                    ]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myYear.setOption(option);
		  },
    myLengths(){
		  // 基于准备好的dom，初始化echarts实例
		  var myLength = this.$echarts.init(document.getElementById('length'));
		  // 指定图表的配置项和数据
		  var option = {
                title: {
                    text: '电影时长统计',
                    x: 'center',
                    padding: [15, 10, 10, 10]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return params.seriesName + '<br>' + params.value[0] + '分钟：' + params.value[1] + '部';
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'value',
                    min: 0,
                    max: 300,
                }],
                yAxis: [{
                    type: 'value',
                }],
                series: [{
                    name: '电影时长统计',
                    type: 'line',
                    symbol: 'none',
                    data: [
                        [22, 1],
                        [40, 1],
                        [41, 1],
                        [43, 2],
                        [44, 1],
                        [45, 2],
                        [47, 1],
                        [48, 1],
                        [49, 4],
                        [55, 2],
                        [56, 2],
                        [57, 1],
                        [60, 1],
                        [61, 1],
                        [62, 2],
                        [63, 2],
                        [64, 2],
                        [65, 5],
                        [66, 1],
                        [67, 4],
                        [68, 3],
                        [69, 2],
                        [70, 8],
                        [71, 4],
                        [72, 9],
                        [73, 8],
                        [74, 4],
                        [75, 9],
                        [76, 4],
                        [77, 12],
                        [78, 9],
                        [79, 4],
                        [80, 20],
                        [81, 21],
                        [82, 12],
                        [83, 27],
                        [84, 40],
                        [85, 59],
                        [86, 39],
                        [87, 46],
                        [88, 71],
                        [89, 68],
                        [90, 141],
                        [91, 63],
                        [92, 95],
                        [93, 97],
                        [94, 100],
                        [95, 120],
                        [96, 111],
                        [97, 93],
                        [98, 118],
                        [99, 92],
                        [100, 139],
                        [101, 82],
                        [102, 102],
                        [103, 86],
                        [104, 101],
                        [105, 109],
                        [106, 109],
                        [107, 109],
                        [108, 94],
                        [109, 76],
                        [110, 115],
                        [111, 71],
                        [112, 77],
                        [113, 83],
                        [114, 68],
                        [115, 91],
                        [116, 79],
                        [117, 81],
                        [118, 92],
                        [119, 78],
                        [120, 78],
                        [121, 58],
                        [122, 39],
                        [123, 61],
                        [124, 50],
                        [125, 50],
                        [126, 45],
                        [127, 42],
                        [128, 43],
                        [129, 43],
                        [130, 60],
                        [131, 22],
                        [132, 33],
                        [133, 30],
                        [134, 33],
                        [135, 18],
                        [136, 25],
                        [137, 14],
                        [138, 26],
                        [139, 21],
                        [140, 24],
                        [141, 17],
                        [142, 12],
                        [143, 16],
                        [144, 17],
                        [145, 12],
                        [146, 17],
                        [147, 12],
                        [148, 4],
                        [149, 4],
                        [150, 10],
                        [151, 6],
                        [152, 6],
                        [153, 9],
                        [154, 10],
                        [155, 9],
                        [157, 8],
                        [158, 5],
                        [159, 6],
                        [160, 5],
                        [161, 5],
                        [162, 7],
                        [163, 4],
                        [164, 1],
                        [165, 6],
                        [166, 3],
                        [167, 1],
                        [168, 3],
                        [169, 5],
                        [170, 4],
                        [171, 4],
                        [172, 1],
                        [173, 1],
                        [174, 2],
                        [175, 4],
                        [176, 2],
                        [177, 3],
                        [178, 3],
                        [179, 4],
                        [180, 6],
                        [181, 1],
                        [183, 3],
                        [184, 1],
                        [186, 1],
                        [187, 1],
                        [188, 1],
                        [189, 2],
                        [190, 3],
                        [191, 1],
                        [192, 2],
                        [193, 1],
                        [194, 1],
                        [195, 2],
                        [196, 2],
                        [197, 1],
                        [200, 1],
                        [201, 2],
                        [202, 1],
                        [204, 1],
                        [210, 1],
                        [212, 1],
                        [216, 1],
                        [217, 1],
                        [229, 1],
                        [230, 1],
                        [236, 1],
                        [237, 1],
                        [238, 1],
                        [244, 1],
                        [254, 1],
                        [266, 1],
                        [273, 1],
                        [297, 1],
                        [450, 1]
                    ]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myLength.setOption(option);
		  },
    myBasics(){
		  // 基于准备好的dom，初始化echarts实例
		  var myBasic = this.$echarts.init(document.getElementById('basic'));
		  // 指定图表的配置项和数据
		  var option = {
                title: {
                    text: '电影评分统计',
                    x: 'center',
                    padding: [15, 10, 10, 10]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return params.seriesName + '<br>' + params.value[0] + '分：' + params.value[1] + '部';
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'value',
                    min: 2,
                    max: 10,
                }],
                yAxis: [{
                    type: 'value',
                }],
                series: [{
                    name: '电影评分统计',
                    type: 'line',
                    data: [
                        [2.5, 1],
                        [3.6, 1],
                        [3.8, 2],
                        [3.9, 2],
                        [4.0, 7],
                        [4.1, 8],
                        [4.2, 8],
                        [4.3, 7],
                        [4.4, 11],
                        [4.5, 11],
                        [4.6, 17],
                        [4.7, 13],
                        [4.8, 11],
                        [4.9, 15],
                        [5.0, 21],
                        [5.1, 32],
                        [5.2, 38],
                        [5.3, 29],
                        [5.4, 47],
                        [5.5, 55],
                        [5.6, 52],
                        [5.7, 87],
                        [5.8, 71],
                        [5.9, 73],
                        [6.0, 82],
                        [6.1, 81],
                        [6.2, 91],
                        [6.3, 97],
                        [6.4, 131],
                        [6.5, 119],
                        [6.6, 149],
                        [6.7, 144],
                        [6.8, 142],
                        [6.9, 116],
                        [7.0, 133],
                        [7.1, 147],
                        [7.2, 160],
                        [7.3, 151],
                        [7.4, 163],
                        [7.5, 156],
                        [7.6, 154],
                        [7.7, 146],
                        [7.8, 122],
                        [7.9, 120],
                        [8.0, 170],
                        [8.1, 183],
                        [8.2, 177],
                        [8.3, 155],
                        [8.4, 140],
                        [8.5, 131],
                        [8.6, 106],
                        [8.7, 104],
                        [8.8, 69],
                        [8.9, 45],
                        [9.0, 29],
                        [9.1, 31],
                        [9.2, 12],
                        [9.3, 4],
                        [9.4, 5],
                        [9.5, 2],
                        [9.6, 1]
                    ]
                }]
            };
		  // 使用刚指定的配置项和数据显示图表。
		  myBasic.setOption(option);
		  },
  },
  mounted() {
  	this.myTypes();
  	this.myLanguages();
  	this.myDistricts();
  	this.myYears();
  	this.myLengths();
  	this.myBasics();
  }
}
</script>

<style>

</style>
<!--myTypes(){-->
<!--		  // 基于准备好的dom，初始化echarts实例-->
<!--		  var myType = this.$echarts.init(document.getElementById('type'));-->
<!--		  // 指定图表的配置项和数据-->
<!--		  var option =-->
<!--		  // 使用刚指定的配置项和数据显示图表。-->
<!--		  myType.setOption(option);-->
<!--		  },-->
