import React, { FC } from 'react';
import StepNavigation from './StepNavigation';
import style from './stepProgress.module.scss';

interface IStepProgressProps {
    labelArray: string[];
    stepKey: string;
    setStepKey: (key: string) => void;
}

const StepProgress: FC<IStepProgressProps> = ({
    stepKey,
    setStepKey,
    labelArray,
}) => {
    const updateStep = (step: string): void => {
        setStepKey(step);
    };

    return (
        <div className={style.wrapper}>
            <StepNavigation
                labelArray={labelArray}
                currentStep={stepKey}
                updateStep={updateStep}
            />
        </div>
    );
};

export default StepProgress;
