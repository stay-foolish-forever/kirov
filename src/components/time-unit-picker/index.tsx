import {JSX} from "react" ;
import {MenuItem, Select, SelectChangeEvent} from "@mui/material" ;
import {DemoContainer} from "@mui/x-date-pickers/internals/demo" ;
import {TimeUnit} from "@/common/enums/time-unit" ;
import {useSafeState} from "ahooks" ;

/**
 * format: YYYY-MM-DD
 */
export interface TimeUnitPickerProps {
    onChange: (value: TimeUnit) => void;
}

export default function TimeUnitPicker(props: TimeUnitPickerProps): JSX.Element {
    const {
              onChange,
          } = props ;
    const [timeUnit, setTimeUnit] = useSafeState<TimeUnit>(TimeUnit.DAY) ;

    function handleChange(event: SelectChangeEvent): void {
        const newValue = event.target.value as TimeUnit ;
        setTimeUnit(newValue) ;
        onChange(newValue) ;
    }

    return (
        <div style={{display: "flex"}}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
                <Select
                    variant={"outlined"}
                    value={timeUnit}
                    label="TimeUnit"
                    onChange={handleChange}
                >
                    <MenuItem value={TimeUnit.DAY}>{TimeUnit.DAY}</MenuItem>
                    <MenuItem value={TimeUnit.MONTH}>{TimeUnit.MONTH}</MenuItem>
                    <MenuItem value={TimeUnit.YEAR}>{TimeUnit.YEAR}</MenuItem>
                </Select>
            </DemoContainer>
        </div>
    ) ;
}
