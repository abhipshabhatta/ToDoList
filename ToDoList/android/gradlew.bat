@ECHO OFF
SETLOCAL

:: Check that we are in the same directory as the gradlew file
cd /D "%~dp0"

SET DIRNAME=%~dp0%
SET APP_BASE_NAME=%~n0
SET GRADLE_WRAPPER_DIR=gradle\wrapper
SET WRAPPER_JAR=gradle-wrapper.jar
SET WRAPPER_PROPERTIES=gradle-wrapper.properties

SET WRAPPER_JAR_PATH=%DIRNAME%%GRADLE_WRAPPER_DIR%\%WRAPPER_JAR%

IF NOT EXIST "%WRAPPER_JAR_PATH%" (
  ECHO "Cannot find %WRAPPER_JAR_PATH%. Please place the gradle-wrapper.jar in the correct location."
  EXIT /B 1
)

java -Xmx64m -cp "%WRAPPER_JAR_PATH%" org.gradle.wrapper.GradleWrapperMain %*
