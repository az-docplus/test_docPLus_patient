import {Host} from '../utils/connection';
import io from 'socket.io-client';
export const socket = io(`${Host}/chat`);
export const WaitingRoomSocket = io(`${Host}/waitingRoom`);
