import {useState} from "react" ;
import dayjs, {Dayjs} from "dayjs" ;
import {StatType} from "@/common/enums/stat-type" ;
import {MenuItem, Select, SelectChangeEvent} from "@mui/material" ;
import {DemoContainer} from "@mui/x-date-pickers/internals/demo" ;
import {DatePicker} from "@mui/x-date-pickers/DatePicker" ;

/**
 * format: YYYY-MM-DD
 */
export interface PickerProps {
    changeStart: (value: string) => void,
    changeEnd: (value: string) => void,
    changeType: (value: StatType) => void,
}

export default function Picker({changeStart, changeEnd, changeType}: {
    changeStart: Function,
    changeEnd: Function,
    changeType: Function,
}) {
    const [startDay, setStartDay] = useState<Dayjs>(dayjs("2022-01-01")) ;
    const [endDay, setEndDay] = useState<Dayjs>(dayjs("2023-01-01")) ;
    const [type, setType] = useState<string>(StatType.NPM) ;

    const handleStart = (newValue: Dayjs | null) => {
        if (newValue) {
            setStartDay(newValue) ;
            changeStart(newValue.format("YYYY-MM-DD")) ;
        }
    } ;
    const handleEnd = (newValue: Dayjs | null) => {
        if (newValue) {
            setEndDay(newValue) ;
            changeEnd(newValue.format("YYYY-MM-DD")) ;
        }
    } ;
    const handleType = (event: SelectChangeEvent) => {
        const type = event.target.value ;
        setType(type) ;
        changeType(type) ;
    } ;

    return (
        <div style={{display: "flex"}}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker label="Start date"
                            value={startDay}
                            onChange={(value) => void handleStart(value)}/>
                <DatePicker label="End date"
                            value={endDay}
                            onChange={(value) => void handleEnd(value)}/>
                <Select
                    variant={"outlined"}
                    value={type}
                    label="StatType"
                    onChange={handleType}
                >
                    <MenuItem value={StatType.NPM}>NPM</MenuItem>
                    <MenuItem value={StatType.GITHUB}>GITHUB</MenuItem>
                </Select>
            </DemoContainer>
        </div>
    ) ;
}
