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
    '#058DC7',
    '#50B432',
    '#ED561B',
    '#DDDF00',
    '#24CBE5',
    '#64E572',
    '#FF9655',
    '#FFF263',
    '#6AF9C4',
    '#d11f3a',
]

const DoanhThuDiaDiemChart = (props) => {
    const [chartTitle, setChartTitle] = useState(
        'Thống kê doanh thu từng địa điểm'
    )

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

    function getPieData(data) {
        const arrResult = []
        data.forEach((e) => {
            let obj = new Object()
            obj.name = e.placeTitle
            obj.y = e.total / 1000000
            obj.soVeDon = e.soVeDon
            obj.soVeTuyen = e.soVeTuyen
            arrResult.push(obj)
        })
        return arrResult
    }

    function getDataWithTip(data) {
        const arrResult = []
        data.forEach((e) => {
            let obj = new Object()
            obj.y = e.total / 1000000
            obj.soVeDon = e.soVeDon
            obj.soVeTuyen = e.soVeTuyen
            arrResult.push(obj)
        })
        return arrResult
    }

    function chartOption(t) {
        if (t == 1) {
            return options
        }
        if (t == 2) {
            return optionsPie
        }
        return options
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
                '<td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<td style="padding:0"><b>{point.soVeDon} vé đơn</b></td></tr>' +
                '<td style="padding:0"><b>{point.soVeTuyen} vé tuyến</b></td></tr>',
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
                    res.dataDoanhThuDiem &&
                    res.dataDoanhThuDiem.map((e) => e.placeTitle)) ||
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
                        res.dataDoanhThuDiem &&
                        getDataWithTip(res.dataDoanhThuDiem)) ||
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
                '<td style="padding:0"><b>{point.y:.3f} triệu đồng</b></td></tr>' +
                '<td style="padding:0"><b>{point.soVeDon} vé đơn</b></td></tr>' +
                '<td style="padding:0"><b>{point.soVeTuyen} vé tuyến</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        series: [
            {
                name: 'Triệu đồng',
                data:
                    (res &&
                        res.dataDoanhThuDiem &&
                        getPieData(res.dataDoanhThuDiem)) ||
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
                    options={chartOption(props.type)}
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

export default DoanhThuDiaDiemChart
