import React from 'react';
import {
    MedicationHeaderRowStyle,
    MedicationHeaderSpanStyle,
    MedicationFirstHeaderSpanStyle
} from '../styles';

const MedicationsHeader = () => (
    <thead>
        <tr>
            <th scope="col">Medication Order Details </th>
            <th scope="col">Date </th>
        </tr>
    </thead >
)

export default MedicationsHeader;