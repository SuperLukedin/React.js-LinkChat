import React, { useState, useEffect } from 'react';
import { getIsDocumentHidden, getBrowserVisibilityProp} from './visHelper'

export function usePageVisibility() {
    const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())
    React.useEffect(() => {
      const visibilityChange = getBrowserVisibilityProp()
      window.addEventListener(visibilityChange, onVisibilityChange, false)
      return () => {
        window.removeEventListener(visibilityChange, onVisibilityChange)
      }
    })
    return isVisible
  }