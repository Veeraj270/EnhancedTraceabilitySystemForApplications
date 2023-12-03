FROM openjdk:17-oracle
COPY build/libs/ETSystemFull*.jar etsystem.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "etsystem.jar"]