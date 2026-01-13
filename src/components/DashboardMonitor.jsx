"use client";

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Check, 
  X, 
  FileText, 
  Search, 
  LayoutList, 
  Monitor, 
  Database,
  ArrowRight,
  Inbox,
  Activity,
  Lock
} from 'lucide-react';

export default function DashboardProcess() {
  // Estado para controlar la pestaña activa ('recepcion' o 'proceso')
  const [activeTab, setActiveTab] = useState("recepcion");
  const [region, setRegion] = useState("BELCORP PERU (PE)");

  // Simulación: Cambia esto a false para ver cómo se vería si la recepción fallara
  const isReceptionComplete = true; 

  // Estilos de marca Yobel
  const brandGradient = "bg-gradient-to-r from-yellow-400 to-cyan-400";
  const brandTextGradient = "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-cyan-500";

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-700">
      
      {/* --- HEADER --- */}
      <div className="relative mb-6 bg-white p-4 rounded-lg shadow-sm overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1.5 ${brandGradient}`}></div>
        
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-xl font-bold uppercase tracking-wide text-slate-800 flex items-center gap-2">
            {/* Cambiamos el título dinámicamente según la pestaña */}
            {activeTab === 'recepcion' ? 'Monitor de Recepción' : 'Monitor de Proceso'}
          </h1>
          <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-cyan-500/20">
            Volver
          </button>
        </div>
      </div>

      {/* --- SISTEMA DE PESTAÑAS (TABS) --- */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
        
        {/* Pestaña 1: Recepción de Pedidos */}
        <button
          onClick={() => setActiveTab('recepcion')}
          className={`pb-3 px-6 text-sm font-bold uppercase tracking-wide transition-all relative
            ${activeTab === 'recepcion' 
              ? 'text-cyan-600' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <div className="flex items-center gap-2">
            <Inbox size={18} />
            Recepción de Pedidos
          </div>
          {/* Línea inferior activa con gradiente */}
          {activeTab === 'recepcion' && (
            <div className={`absolute bottom-0 left-0 w-full h-1 ${brandGradient} rounded-t-full`}></div>
          )}
        </button>

        {/* Pestaña 2: Proceso de Pedidos */}
        <button
          onClick={() => isReceptionComplete && setActiveTab('proceso')}
          disabled={!isReceptionComplete}
          className={`pb-3 px-6 text-sm font-bold uppercase tracking-wide transition-all relative
            ${activeTab === 'proceso' 
              ? 'text-cyan-600' 
              : isReceptionComplete ? 'text-slate-400 hover:text-slate-600' : 'text-gray-300 cursor-not-allowed'
            }`}
        >
          <div className="flex items-center gap-2">
            {isReceptionComplete ? <Activity size={18} /> : <Lock size={16} />}
            Proceso de Pedidos
          </div>
          {activeTab === 'proceso' && (
            <div className={`absolute bottom-0 left-0 w-full h-1 ${brandGradient} rounded-t-full`}></div>
          )}
        </button>
      </div>

      {/* --- CONTENIDO CONDICIONAL --- */}
      
      {/* 1. VISTA DE RECEPCIÓN (Placeholder lógico) */}
      {activeTab === 'recepcion' && (
        <div className="animate-fade-in-up">
           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-cyan-50 rounded-full mb-4">
                 <Inbox size={48} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Detalle de Recepción</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                 Aquí se visualizaría la validación inicial de los archivos antes de procesarlos.
              </p>
              
              {/* Botón simula pasar al siguiente paso */}
              <button 
                onClick={() => setActiveTab('proceso')}
                className={`px-6 py-2 rounded-full text-white font-bold shadow-md transition-transform active:scale-95 ${brandGradient}`}
              >
                Ver Proceso de Pedidos →
              </button>
           </div>
        </div>
      )}

      {/* 2. VISTA DE PROCESO (Dashboard Original) */}
      {activeTab === 'proceso' && (
        <div className="animate-fade-in-up">
          {/* --- SELECTOR --- */}
          <div className="mb-6 w-full max-w-md">
            <div className="relative group">
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-slate-700 py-3 px-4 pr-8 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 font-medium cursor-pointer transition-all hover:border-cyan-300"
              >
                <option value="BELCORP PERU (PE)">BELCORP PERU (PE)</option>
                <option value="BELCORP COLOMBIA (CO)">BELCORP COLOMBIA (CO)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-500 group-hover:text-yellow-500 transition-colors">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* --- TABLA RESUMEN --- */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="grid grid-cols-7 bg-slate-700 text-white text-xs font-bold py-3 px-4 uppercase tracking-wider items-center text-center border-b-4 border-cyan-400">
              <div className="text-left">Fch.Proceso</div>
              <div>Lote</div>
              <div>Campaña</div>
              <div>Tot. Pedidos</div>
              <div>Tot. Pedidos</div>
              <div>Carga</div>
              <div>Bultos</div>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-100 py-4 px-4 items-center text-sm font-medium text-center text-slate-600 hover:bg-gray-50 transition-colors">
              <div className="text-left text-gray-400 font-normal">2025-12-09</div>
              <div className="font-bold text-slate-800">2</div>
              <div>202601</div>
              
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">6,550</span>
                <div className="flex items-center gap-1 text-cyan-500 text-xs">
                  <Database size={14} />
                  <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${brandGradient} w-3/4`}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">6,550</span>
                <div className="flex items-center gap-1 text-red-400 text-xs">
                  <Database size={14} />
                  <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 w-full"></div>
                  </div>
                </div>
              </div>

              <div className="font-bold text-lg">7</div>

              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">7,550</span>
                <div className="flex items-center gap-1 text-cyan-500 text-xs">
                  <Database size={14} />
                   <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${brandGradient} w-4/5`}></div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-7 mt-4 pt-3 border-t flex justify-end items-center gap-4 text-slate-500">
                 <span className="flex items-center gap-2 text-cyan-700 font-bold border border-cyan-100 px-3 py-1 rounded bg-cyan-50">
                    <LayoutList size={16} className="text-cyan-500"/> EN Progreso
                 </span>
                 <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-cyan-50 rounded text-slate-400 hover:text-cyan-500 transition-colors"><Monitor size={18}/></button>
                    <button className="p-1.5 hover:bg-cyan-50 rounded text-slate-400 hover:text-cyan-500 transition-colors"><LayoutList size={18}/></button>
                 </div>
              </div>
            </div>
          </div>

          {/* --- FLUJO DEL PROCESO --- */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4 md:px-12 py-8">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

            <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-cyan-400 w-full md:w-1/3 relative min-h-[180px]">
               <h3 className="font-bold text-slate-800 mb-4 uppercase flex items-center gap-2">1. Recepción</h3>
               <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-600 text-sm font-medium">
                      <span className="bg-cyan-100 p-0.5 rounded"><Check size={14} strokeWidth={4}/></span>
                      Completo
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <span className="bg-red-100 text-red-500 p-0.5 rounded"><Check size={14} strokeWidth={4}/></span>
                      API ValidateOrders
                  </div>
                   <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <span className="bg-red-100 text-red-500 p-0.5 rounded"><Check size={14} strokeWidth={4}/></span>
                      API ValidateOrders
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                      <FileText size={16} /> 3 min
                  </div>
               </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center text-xs text-slate-400 bg-gray-50 px-2 rounded z-10">
                <span>1340 pedidos</span>
                <ArrowRight size={16} className="text-cyan-400"/>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-yellow-400 w-full md:w-1/3 min-h-[180px] transform md:-translate-y-2">
               <h3 className="font-bold text-slate-800 mb-1 uppercase">Validación</h3>
               <span className={`${brandTextGradient} text-xs font-bold mb-4 block`}>(API TIME)</span>
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                      <Database size={16} className="text-slate-300"/>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${brandGradient}`} style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-red-500 text-xs font-bold">!</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Database size={16} className="text-slate-300"/>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${brandGradient}`} style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-cyan-500 text-xs font-bold">✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Database size={16} className="text-slate-300"/>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${brandGradient}`} style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-red-500 text-xs font-bold">!</span>
                  </div>
               </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center text-xs text-slate-400 bg-gray-50 px-2 rounded z-10">
                <span>1340 pedidos</span>
                <ArrowRight size={16} className="text-cyan-400"/>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-cyan-400 w-full md:w-1/3 flex items-center justify-between min-h-[180px]">
               <div className="w-full">
                <h3 className="font-bold text-slate-800 mb-4 uppercase">APIS Invocadas</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-cyan-600 text-sm font-bold">
                        <span className="bg-cyan-100 p-0.5 rounded"><Check size={14} strokeWidth={4}/></span>
                        5 completado
                    </div>
                    <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                        <span className="bg-red-100 p-0.5 rounded"><X size={14} strokeWidth={4}/></span>
                        API Completado
                    </div>
                     <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                        <span className="bg-red-100 p-0.5 rounded"><X size={14} strokeWidth={4}/></span>
                        API ValidateOrders 5 min
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>
               </div>
               
               <div className="ml-4 flex flex-col items-center justify-center gap-1 cursor-pointer group">
                   <div className="border-2 border-yellow-400 rounded p-2 group-hover:bg-yellow-50 transition-colors">
                      <Search className="text-yellow-500" size={24}/>
                   </div>
                   <span className="text-xs text-slate-600 font-medium whitespace-nowrap">Ver Logs</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Fijo */}
      <div className="text-center mt-12 mb-6">
        <h2 className={`font-bold text-sm md:text-base tracking-wide border-t border-cyan-200 inline-block px-12 pt-4 ${brandTextGradient}`}>
          DETALLE DEL PROCESO EN EJECUCIÓN PARA SINCERAR LOS PROCESOS
        </h2>
      </div>

    </div>
  );
}