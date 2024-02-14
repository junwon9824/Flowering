import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../api/Axios';

const initialState = {
  consultantSessionName: '',

  participantId: 2,

  participantList: [
    {
      id: 1,
      role: '',
      imageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
      ,
      name: 'bot',
      isMic: 'false',
      isCam: 'false',

    }
  ]
}

export const getconsultantSessionName = createAsyncThunk(
  'consult/getconsultantSessionName',
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`consultings/join`, { reservationId: reservationId })
      return response.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  }
)


const consultsessionnameSlice = createSlice({
  name: 'consultsessionname',
  initialState,

  reducers: {
    settingModalOn: (state) => {
      state.isSetClear = true;
    },
    settingModalOff: (state) => {
      state.isSetClear = false;
    },

    setCustomer: (state, { payload }) => {
      state.customer = payload
    },

    setSession: (state, { payload }) => {
      state.session = payload
    },
    setconsultantSessionName: (state, { payload }) => {
      state.consultantSessionName = payload
    },
    removeconsultantSessionName: (state) => {
      state.consultantSessionName = '';
    },
    setConsultid: (state, { payload }) => {
      state.consult_id = payload
    }, setCreatorid: (state, { payload }) => {
      state.creatorid = payload
    },
    resetSessionName: (state) => {
      state.creatorSessionName = ''
    },
    setCustomer: (state, { payload }) => {
      state.customer = payload
    },

    appendParticipantList: (state, { payload }) => {
      payload.id = state.participantId //처음에 2
      state.participantId = state.participantId + 1
      state.participantList.push(payload)
      console.log('participant pushed ' + payload.name + " " + payload.id +
        " state.participantId" + state.participantId)
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getconsultantSessionName.fulfilled, (state, { payload }) => {
        state.consultantSessionName = payload.sessionId
      })
  }

})

export const { settingModalOn, settingModalOff, setSession, resetSessionName,
  setReservationId, resetMsg, setconsultid, setCustomer, setconsultantSessionName
  , appendParticipantList, removeconsultantSessionName
} = consultsessionnameSlice.actions;

export default consultsessionnameSlice.reducer;
