import React, { useState, useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addNoDataModule from 'highcharts/modules/no-data-to-display'
import exporting from 'highcharts/modules/exporting'
import exportData from 'highcharts/modules/export-data'
import mConfig from '../../config/vnp_config.json'
import { NumberBox } from 'devextreme-react/number-box'
import { SelectBox } from 'devextreme-react/select-box'

import { useSelector } from 'react-redux'

addNoDataModule(Highcharts)
exporting(Highcharts)
exportData(Highcharts)

const titleStyle = {
    'text-transform': 'uppercase',
    color: '#CD4C2D',
    'font-family': 'Mulish Bold, sans-serif',
    'font-size': '25px',
    'line-height': '24px',
}

const colorSetData = [
    {
        id: 1,
        name: 'Bảng màu 1',
    },
    {
        id: 2,
        name: 'Bảng màu 2',
    },
    {
        id: 3,
        name: 'Bảng màu 3',
    },
]

const colorset1 = [
    '#FF9021',
    '#E2A7A7',
    '#FFF500',
    '#5b34eb',
    '#d11f3a',
    '#64E572',
    '#FF9655',
    '#22C4F8',
    '#00A040',
    '#d1431f',
]
const colorset2 = [
    '#22C4F8',
    '#00A040',
    '#FF7757',
    '#DDDF00',
    '#d11f3a',
    '#24CBE5',
    '#64E572',
    '#FF9655',
    '#FFF263',
    '#6AF9C4',
]
const colorset3 = [
    '#ED561B',
    '#DDDF00',
    '#24CBE5',
    '#058DC7',
    '#50B432',
    '#FFF263',
    '#6AF9C4',
    '#d11f3a',
    '#64E572',
    '#FF9655',
]

const DoanhThuChart = (props) => {
    const [chartType, setChartType] = useState(0)
    const [chartTitle, setChartTitle] = useState('Thống kê doanh thu theo ngày')

    const [barWidth, setBarWidth] = useState(undefined)
    const [pieWidth, setPieWidth] = useState(undefined)
    const [colorSet, setColorSet] = useState(1)

    const chartElement = useRef()

    const res = useSelector((state) => state.thongke)

    const barWidthChanged = (e) => {
        setBarWidth(e.value)
        if (props.type == 1) {
            chartElement.current.chart.update({
                plotOptions: {
                    series: {
                        pointWidth: e.value > 0 ? e.value : undefined,
                    },
                },
            })
        }
    }

    const pieWidthChanged = (e) => {
        setPieWidth(e.value)
        if (props.type == 2) {
            chartElement.current.chart.update({
                plotOptions: {
                    pie: {
                        size: e.value > 0 ? e.value : null,
                    },
                },
            })
        }
    }

    const colorSelectChangeHandler = (e) => {
        setColorSet(e.value)
    }

    function returnColorSet(slted) {
        if (slted == 1) {
            return colorset1
        } else if (slted == 2) {
            return colorset2
        } else if (slted == 3) {
            return colorset3
        }
    }

    useEffect(() => {
        if (props.opt && props.opt.diaDiem) {
            if (
                (props.opt.diaDiem.length == 1 && props.customer == 0) ||
                (props.opt.diaDiem.length == 1 && props.customer == null)
            ) {
                setChartType(1)
                let title = `Thống kê doanh thu tham quan theo ngày`
                setChartTitle(title)
            } else {
                setChartTitle('Thống kê doanh thu theo ngày')
                setChartType(0)
            }
        }
    }, [props.opt])

    function getName(data) {
        const arrResult = []
        arrResult.push(data)
        return arrResult
    }

    function getTotal(data, cond) {
        const arrResult = []
        data.forEach((e) => {
            if (e.isForeign != null && e.isForeign == cond) {
                let a = new Object()
                a.y = e.totalAmount / 1000000
                a.tip = e.soVe
                arrResult.push(a)
            }
        })
        return arrResult
    }

    function getPieData(data) {
        const arrResult = []
        data.forEach((e) => {
            if (e.receiptStatistic && e.receiptStatistic[0]) {
                let obj = new Object()
                obj.name = e.name
                obj.y = e.receiptStatistic[0].doanhThu / 1000000
                obj.tip = e.receiptStatistic[0].soVe
                arrResult.push(obj)
            }
        })
        return arrResult
    }

    function getPieTotal(data, cond) {
        let result = 0
        data.forEach((e) => {
            if (e.isForeign != null && e.isForeign == cond) {
                result = e.totalAmount / 1000000
            }
        })
        return result
    }

    function getPieSoVe(data, cond) {
        let result = 0
        data.forEach((e) => {
            if (e.isForeign != null && e.isForeign == cond) {
                result = e.soVe
            }
        })
        return result
    }

    function getDataWithTip(data) {
        const arrResult = []
        data.forEach((e) => {
            if (e.receiptStatistic && e.receiptStatistic[0]) {
                let obj = new Object()
                obj.y = e.receiptStatistic[0].doanhThu / 1000000
                obj.tip = e.receiptStatistic[0].soVe
                arrResult.push(obj)
            }
        })
        return arrResult
    }

    function getDataWithTipCustomer(data, type) {
        let result = new Object()
        result.data = []
        const dt = res.dataDoiTuong.filter((e) => e.id == type)
        if (dt && dt[0]) {
            result.name = dt[0].name
            // result.color = dt[0].colorCode
            result.yAxis = 0
        }
        const arr = data.map((e) => e.name)
        if (data) {
            arr.forEach((el) => {
                let f = data.filter((d) => d.name == el)
                if (f && f[0] && f[0].receiptStatistic) {
                    let flag = false
                    f[0].receiptStatistic.forEach((ele) => {
                        if (ele.customerType == type) {
                            flag = true
                            let a = new Object()
                            a.y = ele.doanhThu / 1000000
                            a.tip = ele.soVe
                            result.data.push(a)
                        }
                    })
                    if (flag == false) {
                        let a = new Object()
                        a.y = 0
                        a.tip = 0
                        result.data.push(a)
                    }
                }
            })
        }
        return result
    }

    function chartOption(t, c, cus) {
        if ((t == 1 && c == 0 && cus == 0) || cus == null) {
            return options
        } else if (t == 1 && c == 0 && cus && cus.length > 0) {
            return optionsCustomer
        } else if (t == 1 && c == 1) {
            return optionSingle
        } else if (t == 2 && c == 0) {
            return optionsPie
        } else if (t == 2 && c == 1) {
            return optionSinglePie
        }
        return options
    }

    const optionSingle = {
        chart: {
            type: 'column',
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<tr><td style="padding:0"><b>{point.tip} vé</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.3f}',
                },
            },
        },
        xAxis: {
            categories:
                (res &&
                    res.dataDoanhThu &&
                    res.dataDoanhThu[0] &&
                    res.dataDoanhThu[0].name &&
                    getName(res.dataDoanhThu[0].name)) ||
                [],
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        series: [
            {
                name: 'Khách nội địa',
                data:
                    (res &&
                        res.dataDoanhThu &&
                        getTotal(res.dataDoanhThu, 0)) ||
                    [],
                // color: '#22C4F8',
            },
            {
                name: 'Khách quốc tế',
                data:
                    (res &&
                        res.dataDoanhThu &&
                        getTotal(res.dataDoanhThu, 1)) ||
                    [],
                // color: '#00A040',
            },
        ],
        exporting: {
            enabled: true,
            allowHTML: true,
            fallbackToExportServer: true,
            sourceWidth: 1920,
            sourceHeight: 1080,
            scale: 1,
            chartOptions: {
                subtitle: null,
            },
        },
    }

    const optionSinglePie = {
        chart: {
            type: 'pie',
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<tr><td style="padding:0"><b>{point.tip} vé</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        series: [
            {
                name: 'Lượt khách',
                data: [
                    {
                        name: 'Khách nội địa',
                        y:
                            (res &&
                                res.dataDoanhThu &&
                                getPieTotal(res.dataDoanhThu, 0)) ||
                            0,
                        tip:
                            (res &&
                                res.dataDoanhThu &&
                                getPieSoVe(res.dataDoanhThu, 0)) ||
                            0,
                        // color: '#22C4F8',
                    },
                    {
                        name: 'Khách quốc tế',
                        y:
                            (res &&
                                res.dataDoanhThu &&
                                getPieTotal(res.dataDoanhThu, 1)) ||
                            0,
                        tip:
                            (res &&
                                res.dataDoanhThu &&
                                getPieSoVe(res.dataDoanhThu, 1)) ||
                            0,
                        // color: '#00A040',
                    },
                ],
            },
        ],
        exporting: {
            enabled: true,
            allowHTML: true,
            fallbackToExportServer: true,
            sourceWidth: 1920,
            sourceHeight: 1080,
            scale: 1,
            chartOptions: {
                subtitle: null,
            },
        },
    }

    const options = {
        chart: {
            type: 'column',
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<tr><td style="padding:0"><b>{point.tip} vé</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.3f}',
                },
            },
        },
        xAxis: {
            categories:
                (res &&
                    res.dataDoanhThu &&
                    res.dataDoanhThu.map((e) => e.name)) ||
                [],
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        series: [
            {
                name: 'Triệu đồng',
                data:
                    (res &&
                        res.dataDoanhThu &&
                        getDataWithTip(res.dataDoanhThu)) ||
                    [],
                // color: '#FF9021',
            },
        ],
        lang: {
            noData: 'Không có dữ liệu để hiển thị',
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030',
            },
        },
        exporting: {
            enabled: true,
            allowHTML: true,
            fallbackToExportServer: true,
            sourceWidth: 1920,
            sourceHeight: 1080,
            scale: 1,
            chartOptions: {
                subtitle: null,
            },
        },
    }

    const optionsCustomer = {
        chart: {
            type: 'column',
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<tr><td style="padding:0"><b>{point.tip} vé</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.3f}',
                },
            },
        },
        xAxis: {
            categories:
                (res &&
                    res.dataDoanhThu &&
                    res.dataDoanhThu.map((e) => e.name)) ||
                [],
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        series:
            (res &&
                res.dataDoanhThu &&
                props.customer &&
                props.customer.length > 0 &&
                props.customer.map((i) =>
                    getDataWithTipCustomer(res.dataDoanhThu, i)
                )) ||
            [],
        lang: {
            noData: 'Không có dữ liệu để hiển thị',
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030',
            },
        },
        exporting: {
            enabled: true,
            allowHTML: true,
            fallbackToExportServer: true,
            sourceWidth: 1920,
            sourceHeight: 1080,
            scale: 1,
            chartOptions: {
                subtitle: null,
            },
        },
    }

    const optionsPie = {
        chart: {
            type: 'pie',
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<tr><td style="padding:0"><b>{point.tip} vé</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        series: [
            {
                name: 'Triệu đồng',
                data:
                    (res && res.dataDoanhThu && getPieData(res.dataDoanhThu)) ||
                    [],
            },
        ],
        lang: {
            noData: 'Không có dữ liệu để hiển thị',
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030',
            },
        },
        exporting: {
            enabled: true,
            allowHTML: true,
            fallbackToExportServer: true,
            sourceWidth: 1920,
            sourceHeight: 1080,
            scale: 1,
            chartOptions: {
                subtitle: null,
            },
        },
    }

    return (
        <div className="row">
            <div className="col-12 mb-3">
                <HighchartsReact
                    ref={chartElement}
                    highcharts={Highcharts}
                    options={chartOption(props.type, chartType, props.customer)}
                />
            </div>
            <div
                className="w-100"
                style={{ display: props.hideTitle == true ? 'none' : 'flex' }}
            >
                <div
                    className="col-3"
                    style={{ display: props.type == 1 ? 'flex' : 'none' }}
                >
                    <NumberBox
                        min={0}
                        value={barWidth}
                        showSpinButtons={false}
                        onValueChanged={barWidthChanged}
                        label="Độ rộng"
                    />
                </div>
                <div
                    className="col-3"
                    style={{ display: props.type == 2 ? 'flex' : 'none' }}
                >
                    <NumberBox
                        min={0}
                        max={340}
                        value={pieWidth}
                        showSpinButtons={false}
                        onValueChanged={pieWidthChanged}
                        label="Đường kính"
                    />
                </div>
                <div className="col-9">
                    <SelectBox
                        items={colorSetData}
                        displayExpr="name"
                        valueExpr="id"
                        label="Bảng màu"
                        labelMode="floating"
                        value={colorSet}
                        onValueChanged={colorSelectChangeHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default DoanhThuChart
