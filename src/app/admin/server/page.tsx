"use client";

import { useEffect, useState } from "react";
import { Server, Cpu, HardDrive, Container, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

interface ServerStats {
    timestamp: string;
    cpu: {
        cores: number;
        load1min: number;
        load5min: number;
        load15min: number;
        usagePercent: number;
    };
    memory: {
        total: number;
        used: number;
        free: number;
        usagePercent: number;
    };
    disk: {
        total: number;
        used: number;
        free: number;
        usagePercent: number;
    };
    containers: Array<{
        name: string;
        cpu: string;
        memory: string;
        memPercent: string;
        netIO: string;
        blockIO: string;
        status?: string;
        image?: string;
        state?: string;
        processes?: Array<{
            pid: number;
            cpu: number;
            memory: number;
            command: string;
        }>;
    }>;
    topProcesses: Array<{
        pid: number;
        cpu: number;
        memory: number;
        command: string;
    }>;
    uptime: string;
    warnings: {
        highCpu: boolean;
        highMemory: boolean;
        highDisk: boolean;
    };
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function ProgressBar({ value, warning = false }: { value: number; warning?: boolean }) {
    const color = warning || value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500';
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${color} transition-all duration-500`}
                style={{ width: `${Math.min(value, 100)}%` }}
            />
        </div>
    );
}

export default function ServerPage() {
    const [stats, setStats] = useState<ServerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://app.listo.family/api/admin/server-stats', {
                headers: {
                    'X-Admin-Key': 'listo-admin-2024'
                }
            });

            if (!res.ok) throw new Error('Failed to fetch stats');

            const data = await res.json();
            setStats(data);
            setLastUpdate(new Date());
            setError(null);
        } catch (err) {
            setError('Kunne ikke hente serverstatistikk');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();

        // Auto-refresh every 30 seconds
        if (autoRefresh) {
            const interval = setInterval(fetchStats, 30000);
            return () => clearInterval(interval);
        }
    }, [autoRefresh]);

    const hasWarnings = stats?.warnings && (stats.warnings.highCpu || stats.warnings.highMemory || stats.warnings.highDisk);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Server className="w-8 h-8 text-charcoal" />
                    <div>
                        <h1 className="text-2xl font-display font-bold text-charcoal">Server Status</h1>
                        <p className="text-charcoal-light text-sm">Hetzner VPS - 49.13.146.99</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-charcoal-light">
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                            className="rounded"
                        />
                        Auto-oppdater
                    </label>
                    <button
                        onClick={fetchStats}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-squircle-sm hover:bg-charcoal-light transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Oppdater
                    </button>
                </div>
            </div>

            {/* Warnings Banner */}
            {hasWarnings && (
                <div className="bg-red-50 border border-red-200 rounded-squircle p-4 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">
                        Høy ressursbruk oppdaget!
                        {stats?.warnings.highCpu && ' CPU'}
                        {stats?.warnings.highMemory && ' RAM'}
                        {stats?.warnings.highDisk && ' Disk'}
                    </span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-squircle p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Stats Grid */}
            {stats && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* CPU */}
                        <div className="bg-white rounded-squircle p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Cpu className="w-5 h-5 text-blue-500" />
                                <h3 className="font-semibold text-charcoal">CPU</h3>
                            </div>
                            <div className="text-3xl font-bold text-charcoal mb-2">
                                {stats.cpu.usagePercent}%
                            </div>
                            <ProgressBar value={stats.cpu.usagePercent} warning={stats.warnings.highCpu} />
                            <p className="text-sm text-charcoal-light mt-2">
                                {stats.cpu.cores} cores • Load: {stats.cpu.load1min.toFixed(2)}
                            </p>
                        </div>

                        {/* Memory */}
                        <div className="bg-white rounded-squircle p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-5 h-5 text-purple-500">💾</div>
                                <h3 className="font-semibold text-charcoal">RAM</h3>
                            </div>
                            <div className="text-3xl font-bold text-charcoal mb-2">
                                {stats.memory.usagePercent}%
                            </div>
                            <ProgressBar value={stats.memory.usagePercent} warning={stats.warnings.highMemory} />
                            <p className="text-sm text-charcoal-light mt-2">
                                {formatBytes(stats.memory.used)} / {formatBytes(stats.memory.total)}
                            </p>
                        </div>

                        {/* Disk */}
                        <div className="bg-white rounded-squircle p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <HardDrive className="w-5 h-5 text-orange-500" />
                                <h3 className="font-semibold text-charcoal">Disk</h3>
                            </div>
                            <div className="text-3xl font-bold text-charcoal mb-2">
                                {stats.disk.usagePercent}%
                            </div>
                            <ProgressBar value={stats.disk.usagePercent} warning={stats.warnings.highDisk} />
                            <p className="text-sm text-charcoal-light mt-2">
                                {formatBytes(stats.disk.used)} / {formatBytes(stats.disk.total)}
                            </p>
                        </div>
                    </div>

                    {/* Containers */}
                    <div className="bg-white rounded-squircle p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Container className="w-5 h-5 text-teal-500" />
                            <h3 className="font-semibold text-charcoal">Docker Containers</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-charcoal-light border-b">
                                        <th className="pb-2 font-medium">Container</th>
                                        <th className="pb-2 font-medium">Status</th>
                                        <th className="pb-2 font-medium">CPU</th>
                                        <th className="pb-2 font-medium">Memory</th>
                                        <th className="pb-2 font-medium">Net I/O</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.containers.map((container) => (
                                        <>
                                            <tr key={container.name} className="border-b border-gray-50">
                                                <td className="py-3 font-medium text-charcoal">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className={`w-4 h-4 ${container.state === 'running' ? 'text-green-500' : 'text-yellow-500'}`} />
                                                        <div>
                                                            <div>{container.name}</div>
                                                            <div className="text-xs text-charcoal-light font-normal">{container.image}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-charcoal-light">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${container.status?.startsWith('Up') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {container.status || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className={`font-medium ${parseFloat(container.cpu) > 50 ? 'text-red-600' : parseFloat(container.cpu) > 20 ? 'text-yellow-600' : 'text-charcoal-light'}`}>
                                                        {container.cpu}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-charcoal-light">{container.memory}</td>
                                                <td className="py-3 text-charcoal-light">{container.netIO}</td>
                                            </tr>
                                            {/* Show processes inside this container if available */}
                                            {container.processes && container.processes.length > 0 && (
                                                <tr key={`${container.name}-processes`} className="bg-gray-50">
                                                    <td colSpan={5} className="py-2 px-4">
                                                        <div className="text-xs text-charcoal-light mb-2 font-semibold">
                                                            🔍 Prosesser inne i {container.name}:
                                                        </div>
                                                        <table className="w-full text-xs font-mono">
                                                            <thead>
                                                                <tr className="text-left text-charcoal-light">
                                                                    <th className="pb-1 font-medium">PID</th>
                                                                    <th className="pb-1 font-medium">CPU %</th>
                                                                    <th className="pb-1 font-medium">RAM %</th>
                                                                    <th className="pb-1 font-medium">Kommando</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {container.processes.map((proc) => (
                                                                    <tr key={`${container.name}-${proc.pid}`} className="border-t border-gray-200">
                                                                        <td className="py-1 text-charcoal-light">{proc.pid}</td>
                                                                        <td className="py-1">
                                                                            <span className={`font-medium ${proc.cpu > 10 ? 'text-red-600' : proc.cpu > 5 ? 'text-yellow-600' : 'text-charcoal'}`}>
                                                                                {proc.cpu.toFixed(1)}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-1 text-charcoal-light">{proc.memory.toFixed(1)}</td>
                                                                        <td className="py-1 text-charcoal-light truncate max-w-md" title={proc.command}>
                                                                            {proc.command}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Processes */}
                    {stats.topProcesses && stats.topProcesses.length > 0 && (
                        <div className="bg-white rounded-squircle p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Cpu className="w-5 h-5 text-purple-500" />
                                <h3 className="font-semibold text-charcoal">Topprosesser (ikke-Docker)</h3>
                                <span className="text-xs text-charcoal-light">
                                    Viser prosesser som bruker &gt; 0.1% CPU eller &gt; 0.5% RAM
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-mono">
                                    <thead>
                                        <tr className="text-left text-charcoal-light border-b">
                                            <th className="pb-2 font-medium">PID</th>
                                            <th className="pb-2 font-medium">CPU %</th>
                                            <th className="pb-2 font-medium">RAM %</th>
                                            <th className="pb-2 font-medium">Kommando</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.topProcesses.map((proc) => (
                                            <tr key={proc.pid} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="py-2 text-charcoal-light">{proc.pid}</td>
                                                <td className="py-2">
                                                    <span className={`font-medium ${proc.cpu > 10 ? 'text-red-600' : proc.cpu > 5 ? 'text-yellow-600' : 'text-charcoal'}`}>
                                                        {proc.cpu.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="py-2">
                                                    <span className={`font-medium ${proc.memory > 10 ? 'text-red-600' : proc.memory > 5 ? 'text-yellow-600' : 'text-charcoal'}`}>
                                                        {proc.memory.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="py-2 text-charcoal-light truncate max-w-md" title={proc.command}>
                                                    {proc.command}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-sm text-charcoal-light">
                        <span>Uptime: {stats.uptime}</span>
                        <span>
                            Sist oppdatert: {lastUpdate?.toLocaleTimeString('nb-NO')}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
