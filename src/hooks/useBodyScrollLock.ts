"use client";

import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isLocked) {
      // حساب عرض شريط التمرير
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      body.style.overflow = 'hidden';
      body.classList.add('menu-open');
      
      // إضافة padding لمنع القفزة
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      body.style.overflow = '';
      body.classList.remove('menu-open');
      body.style.paddingRight = '';
    }

    return () => {
      body.style.overflow = '';
      body.classList.remove('menu-open');
      body.style.paddingRight = '';
    };
  }, [isLocked]);
}