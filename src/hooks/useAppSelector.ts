import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../store';

const useAppSelctor: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelctor;
