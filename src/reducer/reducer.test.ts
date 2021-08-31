import { reducerFunc } from "./reducer";
import { Action } from "./reducer.types";

const sampleVideo1 = {
  _id: "9-vt7gPVCmA",
  url: "https://www.youtube.com/watch?v=9-vt7gPVCmA",
  thumbnail: "https://img.youtube.com/vi/9-vt7gPVCmA/maxresdefault.jpg",
  title: "How To Choose A Cycling Buddy!",
  statistics: "62,190 views • 14 May 2021",
  description:
    "The great thing about cycling is that it can be enjoyed solo or in a group. Finding someone to ride with can be great for your cycling! It can help get you out the door in bad weather, help you ride further or faster, and it's just great to have a bit of company! In this video, Manon gives you some top tips to help you find the perfect cycling buddy!",
  channelName: "Global Cycling Network",
  channelLogo:
    "https://yt3.ggpht.com/ytc/AAUvwnhTfv0TDTol99arvnHmHi5J41sB682iFGUc0flXRQ=s88-c-k-c0x00ffffff-no-rj",
};

const sampleVideo2 = {
  _id: "I6LITUc8SMg",
  url: "https://www.youtube.com/watch?v=I6LITUc8SMg",
  thumbnail: "https://img.youtube.com/vi/I6LITUc8SMg/maxresdefault.jpg",
  title: "How To Ride In A Paceline | Through And Off Explained",
  statistics: "77,042 views • 12 May 2021",
  description:
    "The paceline, known to cyclists by many names, is key to riding fast and efficiently as a group. Hitting the front with speed and pulling off to slingshot another rider into the lead can help munch the miles when a group works well together. In this video we go through the key skills needed to make a paceline work perfectly!",
  channelName: "Global Cycling Network",
  channelLogo:
    "https://yt3.ggpht.com/ytc/AAUvwnhTfv0TDTol99arvnHmHi5J41sB682iFGUc0flXRQ=s88-c-k-c0x00ffffff-no-rj",
};

describe("testing playlist", () => {
  test("should create playlist when CREATE_PLAYLIST is dispatched", () => {
    let initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [],
    };

    let action = {
      type: "CREATE_PLAYLIST",
      payload: {
        _id: "123",
        name: "ar rahman",
        video: sampleVideo1,
      },
    };

    let state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo1],
        },
      ],
    });
  });

  test("should update playlist name when UPDATE_PLAYLIST_NAME is dispatched", () => {
    let initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo1],
        },
      ],
    };

    let action = {
      type: "UPDATE_PLAYLIST_NAME",
      payload: {
        playlistId: "123",
        name: "amit trivedi",
      },
    };

    let state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "amit trivedi",
          videos: [sampleVideo1],
        },
      ],
    });
  });

  test("should update playlist when UPDATE_PLAYLIST is dispatched", () => {
    let initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo1],
        },
      ],
    };

    let action = {
      type: "UPDATE_PLAYLIST",
      payload: { _id: "123", video: sampleVideo2 },
    };

    let state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo1, sampleVideo2],
        },
      ],
    });

    initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo1, sampleVideo2],
        },
      ],
    };

    action = {
      type: "UPDATE_PLAYLIST",
      payload: { _id: "123", video: sampleVideo1 },
    };

    state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "ar rahman",
          videos: [sampleVideo2],
        },
      ],
    });
  });

  test("should delete playlist when DELETE_PLAYLIST is dispatched", () => {
    let initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "amit trivedi",
          videos: [sampleVideo1],
        },
      ],
    };

    let action = { type: "DELETE_PLAYLIST", payload: { playlistId: "123" } };

    let state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [],
    });

    initialState = {
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "123",
          name: "amit trivedi",
          videos: [sampleVideo1],
        },
        {
          _id: "124",
          name: "ar rahman",
          videos: [sampleVideo2, sampleVideo1],
        },
      ],
    };

    action = { type: "DELETE_PLAYLIST", payload: { playlistId: "123" } };

    state = reducerFunc(initialState, action as Action);

    expect(state).toEqual({
      videos: [],
      liked: [],
      history: [],
      watchLater: [],
      playlist: [
        {
          _id: "124",
          name: "ar rahman",
          videos: [sampleVideo2, sampleVideo1],
        },
      ],
    });
  });
});
