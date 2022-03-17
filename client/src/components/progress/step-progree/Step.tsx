import React, { FC } from 'react';
import style from './stepProgress.module.scss';

interface IStepProps {
    label: string;
    index: number;
    updateStep: (key: string) => void;
    selected: boolean;
}

const Step: FC<IStepProps> = ({ label, index, updateStep, selected }) => {
    const stepClass = `${style.progress__step} ${
        selected ? style.progress__step_selected : ''
    }`;

    return (
        <div className={stepClass}>
            <div
                className={style.progress__circleWrapper}
                onClick={() => {
                    updateStep(label);
                }}
            >
                <div className={style.progress__circle}>{index + 1}</div>
            </div>
            <span>{label}</span>
        </div>
    );
};

export default Step;
