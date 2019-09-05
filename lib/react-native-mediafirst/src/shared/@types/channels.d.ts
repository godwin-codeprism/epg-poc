import { EPGShow } from "./shows";

export interface Channel {
    ChannelNumber: number;
    ServiceCollectionId: string;
    CallLetters: string;
    Images: any[];
    StationType: string;
    StationId: string;
    Name: string;
    Genres: any[];
    ConcurrentViewerDisabled: boolean;
    OriginalStationId: number;
    LocalizedStoresIds: string[];
    IsApplication: boolean;
    IsGenericApplicationService: boolean;
    Groups: number[];
    ProviderId: string;
}

export interface ChannelData {
    Id: number;
    Name: string;
    AutoTuneEnabled: boolean;
    RtpHash: string;
    ChannelMapHash: string;
    Channels: Channel[];
}
