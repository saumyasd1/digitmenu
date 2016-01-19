package com.avery.aoc;

class PatternMatcher
{
  private boolean _ignoreCase;

  public PatternMatcher()
  {
    this._ignoreCase = false;
  }

  public PatternMatcher(boolean ignoreCase)
  {
    this._ignoreCase = ignoreCase;
  }

  public boolean isMatch(String checkString, String pattern)
  {
    return isMatch(checkString, pattern, this._ignoreCase);
  }

  public static boolean isMatch(String checkString, String pattern, boolean ignoreCase)
  {
    int patternPos = 0;

    if (checkString == null)
    {
      return pattern == null;
    }

    if (pattern == null) {
      return false;
    }
    for (int i = 0; i < checkString.length(); i++)
    {
      if (patternPos >= pattern.length()) {
        return false;
      }

      char patternChar = pattern.charAt(patternPos);
      char thisChar = checkString.charAt(i);

      switch (patternChar)
      {
      case '*':
        if (patternPos >= pattern.length() - 1) {
          return true;
        }

        for (int j = i; j < checkString.length(); j++) {
          if (isMatch(checkString.substring(j), 
            pattern.substring(patternPos + 1), ignoreCase)) {
            return true;
          }
        }

        return false;
      case '?':
        break;
      case '[':
        if (patternPos >= pattern.length() - 1) {
          return false;
        }
        char lastPatternChar = '\000';
        for (int j = patternPos + 1; j < pattern.length(); j++)
        {
          patternChar = pattern.charAt(j);
          if (patternChar == ']')
          {
            return false;
          }if (patternChar == '-')
          {
            j++;
            if (j == pattern.length()) {
              return false;
            }
            patternChar = pattern.charAt(j);
            if (patternChar == ']')
            {
              return false;
            }
            if ((thisChar >= lastPatternChar) && (thisChar <= patternChar))
              break;
          } else {
            if (thisChar == patternChar)
            {
              break;
            }
          }
          lastPatternChar = patternChar;
        }

//        patternPos = j;
        for (int j = patternPos; j < pattern.length(); j++)
        {
          if (pattern.charAt(j) == ']')
            break;
        }
//        patternPos = j;
        break;
      default:
        if (thisChar == patternChar) break;
        if (ignoreCase) {
          int intChar = thisChar;
          int intpatternChar = patternChar;
          if (intChar > intpatternChar) {
            if (intChar - intpatternChar == 32) break;
            return false; } else {
            if (intpatternChar - intChar == 32) break;
            return false;
          }
        } else {
          return false;
        }

      }

      patternPos++;
    }

    for (int j = patternPos; j < pattern.length(); j++)
    {
      if (pattern.charAt(j) != '*')
        break;
    }
//    patternPos = j;

    return patternPos == pattern.length();
  }
}