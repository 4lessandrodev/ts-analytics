export default function getUserLocation(): Promise<{
    ip: string;
} | null>;
