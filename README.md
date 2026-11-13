# 🎓 Ecosistema Multiplataforma de Gestión y Control Escolar Integral — TESCo

![Estado](https://img.shields.io/badge/Estado-En_Desarrollo-yellow?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge)
![Web](https://img.shields.io/badge/Web-Fullstack-4CAF50?style=for-the-badge)
![Desktop](https://img.shields.io/badge/Desktop-WinUI_3_%7C_C%23-0078D4?style=for-the-badge)
![Mobile](https://img.shields.io/badge/Mobile-iOS_%26_Android-FF6F00?style=for-the-badge)

> **Proyecto de Residencias Profesionales** desarrollado para el **Tecnológico de Estudios Superiores de Coacalco (TESCo)**.  
> Modernización integral de los procesos de control escolar, sustituyendo arquitecturas heredadas por un ecosistema unificado, seguro y multiplataforma.

---

## 📋 Descripción del Proyecto

El sistema actual de información escolar requiere una transición tecnológica que permita agilizar trámites, eliminar cuellos de botella en periodos de inscripción y centralizar la información académica[cite: 1, 2, 3]. 

Este repositorio alberga el código fuente de un **monorepo multiplataforma** compuesto por una API centralizada y tres clientes especializados (Web, Escritorio y Móvil), diseñados para ofrecer una experiencia fluida a **Alumnos, Docentes y Personal Administrativo**.

---

## 🏗️ Arquitectura del Ecosistema

El proyecto sigue una arquitectura cliente-servidor desacoplada, donde todas las aplicaciones consumen una misma fuente de verdad a través de servicios RESTful seguros:

```text
                        ┌─────────────────────────────┐
                        │      Base de Datos &        │
                        │     Backend API RESTful     │
                        └──────────────┬──────────────┘
                                       │
          ┌────────────────────────────┼────────────────────────────┐
          ▼                            ▼                            ▼
┌───────────────────┐        ┌───────────────────┐        ┌───────────────────┐
│    Portal Web     │        │ Cliente Escritorio│        │ Aplicación Móvil  │
│    (Fullstack)    │        │   (WinUI 3 / C#)  │        │  (iOS & Android)  │
└───────────────────┘        └───────────────────┘        └───────────────────┘
  Alumnos / Docentes           Administrativos y            Consultas rápidas y
  y Registro Inicial            Control Escolar               notificaciones

  