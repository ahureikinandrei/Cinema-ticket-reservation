import React, { FC, ReactElement } from 'react';
import Step from './Step';
import style from './stepProgress.module.scss';

interface IStepNavigationProps {
    labelArray: string[];
    currentStep: string;
    updateStep: (key: string) => void;
}

const StepNavigation: FC<IStepNavigationProps> = ({
    labelArray,
    currentStep,
    updateStep,
}) => {
    return (
        <div className={style.stepWrapper}>
            {labelArray.map(
                (label, index): ReactElement => (
                    <Step
                        label={label}
                        key={label}
                        index={index}
                        updateStep={updateStep}
                        selected={label === currentStep}
                    />
                )
            )}
        </div>
    );
};

export default StepNavigation;
