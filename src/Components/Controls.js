import { useState } from "react";
import { useClient } from "../Actions/settings"
import { Grid,Button } from "@mui/material";
import { Mic } from "@mui/icons-material";
import { MicOff } from "@mui/icons-material";
import { Videocam } from "@mui/icons-material";
import { VideocamOff } from "@mui/icons-material";
import { ExitToApp } from "@mui/icons-material";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Grid container spacing={2} style={{marginLeft:"40vw",marginTop:"5px"}} >
      <Grid item>
        <Button
          variant="contained"
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <Mic/> : <MicOff />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => mute("video")}
        >
          {trackState.video ? <Videocam /> : <VideocamOff/>}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => leaveChannel()}
        >
          Leave
          <ExitToApp />
        </Button>
      </Grid>
    </Grid>
  );
}
