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

const LuotThamQuanChart = (props) => {
    const [chartType, setChartType] = useState(1)
    const [chartTitle, setChartTitle] = useState(
        'Thống kê lượt tham quan theo ngày'
    )

    const [barWidth, setBarWidth] = useState(undefined)
    const [colorSet, setColorSet] = useState(1)

    const chartElement = useRef()

    const res = useSelector((state) => state.thongke)

    const barWidthChanged = (e) => {
        setBarWidth(e.value)
        if (props.type == 'column') {
            chartElement.current.chart.update({
                plotOptions: {
                    series: {
                        pointWidth: e.value > 0 ? e.value : undefined,
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
        if (props.opt && props.opt.loai) {
            if (props.opt.loai == 1) {
                setChartType(1)
                let title = `Thống kê lượt tham quan theo ngày`
                setChartTitle(title)
            } else if (props.opt.loai == 2) {
                setChartTitle('Thống kê lượt tham quan theo năm')
                setChartType(2)
            }
        }
    }, [props.opt])

    const optionYear = {
        chart: {
            type: props.type,
        },
        colors: returnColorSet(colorSet),
        title: {
            text: props.hideTitle == true ? null : chartTitle,
            style: titleStyle,
        },
        tooltip: {
            shared: true,
        },
        xAxis: {
            categories:
                (res &&
                    res.dataLuotThamQuan &&
                    res.dataLuotThamQuan.map((e) => e.nam)) ||
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
                        res.dataLuotThamQuan &&
                        res.dataLuotThamQuan.map((e) => e.soLuotTrongNuoc)) ||
                    [],
                // color: '#22C4F8',
            },
            {
                name: 'Khách Quốc tế',
                data:
                    (res &&
                        res.dataLuotThamQuan &&
                        res.dataLuotThamQuan.map((e) => e.soLuotQuocTe)) ||
                    [],
                // color: '#00A040',
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
            shared: true,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                },
            },
        },
        xAxis: {
            categories:
                (res &&
                    res.dataLuotThamQuan &&
                    res.dataLuotThamQuan.map((e) => e.title)) ||
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
                        res.dataLuotThamQuan &&
                        res.dataLuotThamQuan.map((e) => e.soLuotTrongNuoc)) ||
                    [],
                // color: '#22C4F8',
            },
            {
                name: 'Khách Quốc tế',
                data:
                    (res &&
                        res.dataLuotThamQuan &&
                        res.dataLuotThamQuan.map((e) => e.soLuotQuocTe)) ||
                    [],
                // color: '#00A040',
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
                    options={chartType == 1 ? options : optionYear}
                />
            </div>
            <div
                className="w-100"
                style={{ display: props.hideTitle == true ? 'none' : 'flex' }}
            >
                <div
                    className="col-3"
                    style={{
                        display: props.type == 'column' ? 'flex' : 'none',
                    }}
                >
                    <NumberBox
                        min={0}
                        value={barWidth}
                        showSpinButtons={false}
                        onValueChanged={barWidthChanged}
                        label="Độ rộng"
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

export default LuotThamQuanChart
