import React, { useState } from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { savePreferences } from 'providers/ReduxStore/slices/app';
import StyledWrapper from './StyledWrapper';

const Font = ({ close }) => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.app.preferences);

  const [splitViewDirection, setSplitViewDirection] = useState(get(preferences, 'splitView.direction', 'horizontal'));

  const handleSave = () => {
    dispatch(
      savePreferences({
        ...preferences,
        splitView: {
          direction: splitViewDirection
        }
      })
    ).then(() => {
      close();
    });
  };

  return (
    <StyledWrapper>
      <div className="flex flex-row gap-2 w-full">
        <div className="w-full">
          <label className="block font-medium mb-2">Split View</label>

          <div className='flex flex-row gap-8'>
            <div className='flex flex-row gap-2'>
              <input
                type="radio"
                name="split-direction"
                checked={splitViewDirection === 'horizontal'}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSplitViewDirection('horizontal');
                  }
                }} 
                defaultValue={splitViewDirection}
              />

              Split Horizontally
            </div>

            <div className='flex flex-row gap-2'>
              <input
                type="radio"
                name="split-direction"
                checked={splitViewDirection === 'vertical'}
                onChange={(event) => {  
                  if (event.target.checked) {
                    setSplitViewDirection('vertical');
                  }
                }}
                defaultValue={splitViewDirection}
              />

              Split Vertically
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button type="submit" className="submit btn btn-sm btn-secondary" onClick={handleSave}>
          Save
        </button>
      </div>
    </StyledWrapper>
  );
};

export default Font;
